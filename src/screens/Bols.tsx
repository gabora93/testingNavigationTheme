import React, { FC, useState, useCallback, useEffect } from "react";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextStyle, Dimensions, RefreshControl, ViewStyle, Platform, TouchableOpacity, StyleSheet, FlatList, LogBox, Animated, Easing, ActivityIndicator } from "react-native"
import { StyledBox, StyledText } from '../components/styledComponents/index';
import { Header } from "../components/header/Header";
import { SearchBar } from '@rneui/themed';
import { Button, ButtonText, Box, Pressable, Icon, HStack, VStack, Center, Text, View } from '@gluestack-ui/themed';
import { Menu, RefreshCcw, CalendarMinus, CalendarPlus } from 'lucide-react-native';
import { BOL, DATAA } from "../types/types";
import { spin } from "../animations/spin";
import { rotation } from "../animations/animatedValues";
import { DatePickerModal } from 'react-native-paper-dates';
import moment from "moment";
import { de, en, es, fr, it, nl, pl, registerTranslation, TranslationsType } from 'react-native-paper-dates';
import { DocumentList } from '../components/DocumentList/DocumentList';
import { BOLS } from "../components/DocumentList/data";
import ListItem from "../components/DocumentList/ListItem";
import { i18n } from "../i18n";
import { getFromSecureStore } from "../services/helper";
import BolService from "../services/axiosapi/BolService";
import * as FileSystem from 'expo-file-system';
import Share from 'react-native-share';  



export default function BOLScreen({ navigation }) {
  const { getBOLS, getMultipleBOLS } = BolService();
  const insets = useSafeAreaInsets();
  const locales: [string, TranslationsType][] = [
    ['de', de],
    ['en', en],
    ['es', es],
    ['fr', fr],
    ['it', it],
    ['nl', nl],
    ['pl', pl]
  ]

  locales.forEach((locale) => {
    registerTranslation(locale[0], locale[1])
  })
  // const goToSettings = () => navigation.navigate("settings", { bolList: true, refreshList: refreshList });
  const goBack = () => navigation.goBack();
  const goToBOL = () => navigation.navigate('bol_viewer')


  const [isLoading, setIsLoading] = useState(false);
  const [isBarLoading, setIsBarLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const [bolList, setBolList] = useState<BOL[]>([]);
  const [filteredBolList, setFilteredBolList] = useState<BOL[]>([]);
  const [searchText, setSearchText] = useState('');
  const [selectedDates, setSelectedDates] = useState({ start: '', end: '' });
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const [error, setError] = useState(null);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [rangeOpen, setRangeOpen] = useState(false)
  const [numberOfBols, setNumberOfBols] = React.useState<string | null>('');
  const [refreshCount, setRefreshCount] = React.useState(0);
  const [emptyBOLS, setEmptyBOLS] = React.useState(false);
  const [range, setRange] = useState<{
    startDate: Date | undefined
    endDate: Date | undefined
  }>({ startDate: undefined, endDate: undefined })

  React.useEffect(() => {
    console.log("EXECUTING useEFFECT")
    getMaxNumbOfBols(); // Fetch data when the component mounts
  }, [refreshCount]);

  React.useEffect(() => {
    filterData();
  }, [searchText, range]);

  const filterData = () => {
    let filteredItems = bolList;
    console.log('filtered', filteredItems)

    // Apply text filter
    if (searchText) {
      console.log('Apply text filter')
      console.log('SEARCH TEXT::::::::::::', searchText)
      console.log('BOLIST', filteredItems)

      filteredItems = filteredItems.filter(item =>
        item.Terminal.toUpperCase().includes(searchText.toUpperCase()) ||
        item.TransRefNo.toUpperCase().includes(searchText.toUpperCase()) ||
        item.truck.toUpperCase().includes(searchText.toUpperCase()) ||
        item.trailer1.toUpperCase().includes(searchText.toUpperCase()) ||
        item.trailer2.toUpperCase().includes(searchText.toUpperCase()) ||
        item.doc_no.toUpperCase().includes(searchText.toUpperCase())
      );
      console.log('filteredItems', filteredItems)
    }
    // Apply date filter
    if (startDate && endDate) {
      console.log('Apply DATE filter')
      let startDateToCompare: Date;
      let endDateToCompare: Date;
      if (range.startDate != undefined && range.endDate != undefined) {
        let startingDate = moment(range.startDate);
        let startDateComponent = startingDate.utc().format('YYYY-MM-DD');
        startDateToCompare = new Date(startDateComponent.toString());
        let endingDate = moment(range.endDate).subtract(1, "days");
        let endDateComponent = endingDate.utc().format('YYYY-MM-DD');
        endDateToCompare = new Date(endDateComponent.toString());
        console.log('startDateComponent', startDateComponent)
        console.log('endDateComponent', endDateComponent.toString());
        // Inserted text is not blank
        // Filter the masterDataSource
        // Update FilteredDataSource
        console.log("filteredItems before filter::", filteredItems)
        filteredItems = filteredItems.filter(item => {
          const itemDate = new Date(moment(item.TransDate, 'YYYY/MM/DD').format("YYYY-MM-DD"))
          return itemDate >= startDateToCompare && itemDate <= endDateToCompare;
        }
        );
        console.log("filteredItems after filter::", filteredItems)
      };

    }

    setFilteredBolList(filteredItems);
    setIsBarLoading(!isBarLoading)
  };

  const multipleBols = async () => {
    // const selectedBOLS = filteredBolList.filter((bol) => { return bol.selected !== false });
   

    try {
      const selectedBOLS = filteredBolList.filter((bol)=> selectedItems.includes(bol.doc_no));

      console.log('SELECTED BOLS', selectedItems)
      selectedBOLS.forEach((elemento)=>{
        var lastFive = elemento.BLOB?.substr(elemento.BLOB.length - 5); 
        console.log('last 5:::', lastFive);
        console.log('elemento TRANSREFNO:::', elemento.TransRefNo)
        console.log('elemento docno:::', elemento.doc_no)
      })
      await getMultipleBOLS(selectedBOLS).then((resp) => {
        generatePDFSandShare(resp)
      })
    }
    catch (error) {
      console.log("error", error)
    }
  }


  const rotate = rotation.interpolate({ inputRange: [0, 1], outputRange: ['360deg', '0deg'] });

  const onDismiss = React.useCallback(() => {
    console.log('Date minus 90 days:   ', moment().subtract(90, "days"))
    setRangeOpen(false);
  }, [setRangeOpen]);

  const onChangeRange = useCallback(
    ({ startDate, endDate }: any) => {
      console.log('startDate', startDate)
      console.log('endDate', endDate)
      setRangeOpen(false)

      setRange({ startDate, endDate })
      setStartDate(startDate)
      setEndDate(endDate)

      console.log('range', range)
    },
    [setRangeOpen, setRange]
  )
  let dateRangeSetted = (range.endDate != undefined && range.startDate != undefined)
  const removeDateRange = () => {
    console.log('removing date range')
    console.log('removed date range: ', range)
    setRange({ startDate: undefined, endDate: undefined });
    console.log('after removed date range: ', range)
    setStartDate(null)
    setEndDate(null)
    console.log('after removed date range: ', range)
    console.log('search', searchText)
    setFilteredBolList(bolList);
    if (searchText != '') {
      console.log('search', searchText)
      filterData()
    }
  }

  const refreshList = () => {
    spin()
    console.log("refresing list")
    setRefreshCount((prevState, props) => ({
      refreshCount: prevState.refreshCount + 1
    }));
  }

  const getMaxNumbOfBols = async () => {
    spin();
    console.log("into getMaxNumbOfBols")
    const numofBols: string | null = await getFromSecureStore("numBols");
    console.log('number of bols', numofBols)
    setNumberOfBols(numofBols)
    getBOLs(numofBols)
  }

  const getBOLs = async (numBols) => {
    try {
      console.log("getting getBOLs: ...")
      const license = await getFromSecureStore("license");
      console.log("license", license)
      let body = {
        license: license,
        // license: 'p555443222',
        maxNumberOfBOLs: numBols
      };

      const response = await getBOLS(body)
      console.log('RESPONSE FROM GET BOLS', response)
      if (response.data.result[0].Status === "NO_TRANSACTIONS_FOUND") {
        console.log("no hay bols")
        setEmptyBOLS(true)
      } else {
        const bolArray: BOL[] = Object.values(response.data.result[0].BOLs).filter(function (x) {
          return x.Terminal !== undefined
        });
        bolArray.map((bol) => (bol.unformattedDate = bol.TransDate + ' ' + bol.TransTime))
        bolArray.map((i) => (i.TransDate = moment(i.TransDate, 'YYMMDD').format("YY/MM/DD"), i.TransTime = moment(i.TransTime, 'HHMM').format("HH:MM")));
        setBolList(bolArray);
        setFilteredBolList(bolArray);
        setIsBarLoading(!isBarLoading)
        setIsFetching(false);
        setIsLoading(false)
      }
    } catch (error) {
      console.log("error", error)
      console.log("error type of", typeof (error))
    }
  }

  function getFileUri(name) {
    return FileSystem.documentDirectory + `${encodeURI(name)}.pdf`;
  }

  const generatePDFSandShare = async (data) => {
    const bolsToShare = [];
    for (let i = 0; i < data.length; i++) {
      const fileName = `BOL ${data[i].TransRefNo} ${data[i].unformattedDate}`
      const fileURL = getFileUri(fileName);
      await FileSystem.writeAsStringAsync(getFileUri(fileName), data[i].BLOB, { encoding: FileSystem.EncodingType.Base64 });
      bolsToShare.push({
        "filename": fileName,
        "blob": data[i].BLOB,
        "fileURL": fileURL
      })
    }
    shareMultiplePDFS(bolsToShare);
  };
    
  const shareMultiplePDFS = async (blobs) => {
    console.log('BOLS TO SHARE', blobs[0].fileURL);
    let urls = [];

    for (let i = 0; i < blobs.length; i++) {
      urls.push(blobs[i].fileURL.toString())
    }
    urls.forEach(element => {
      console.log('element', element)
    });

    console.log('urls', urls)
    console.log('type of urls', typeof (urls))
    const shareOptions = {
      title: '',
      urls: urls,
    };
    // If you want, you can use a try catch, to parse
    // the share response. If the user cancels, etc.
    try {
      const ShareResponse = await Share.open(shareOptions);
      console.log('Result =>', ShareResponse);
    } catch (error) {
      console.log('Error =>', error);

    }
  };


  // const filterData = () => {
  //   let filteredItems = documents;
  //   console.log('filtered', filteredItems)
  //   // Apply text filter
  //   if (searchText) {
  //     console.log('Apply text filter')
  //     console.log('SEARCH TEXT::::::::::::', searchText)
  //     console.log('BOLIST', filteredItems)

  //     filteredItems = filteredItems.filter((item: BOL) =>
  //       item.Terminal.toUpperCase().includes(searchText.toUpperCase()) || item.doc_no.toUpperCase().includes(searchText.toUpperCase())
  //     );

  //     console.log('filteredItems', filteredItems)
  //   }

  //   // Apply date filter
  //   if (startDate && endDate) {
  //     console.log('Apply DATE filter')
  //     let startDateToCompare: Date;
  //     let endDateToCompare: Date;
  //     if (range.startDate != undefined && range.endDate != undefined) {
  //           let startingDate = moment(range.startDate);
  //           let startDateComponent = startingDate.utc().format('YYYY-MM-DD');
  //           startDateToCompare = new Date(startDateComponent.toString());

  //           let endingDate = moment(range.endDate).subtract(1, "days");
  //           let endDateComponent = endingDate.utc().format('YYYY-MM-DD');
  //           endDateToCompare = new Date(endDateComponent.toString());
  //           console.log('startDateComponent', startDateComponent)
  //           console.log('endDateComponent', endDateComponent.toString());
  //           // Inserted text is not blank
  //           // Filter the masterDataSource
  //           // Update FilteredDataSource
  //           console.log("filteredItems before filter::", filteredItems)
  //           filteredItems = filteredItems.filter((item: BOL) => {
  //             const itemDate = new Date(moment(item.TransDate, 'YYYY/MM/DD').format("YYYY-MM-DD"))
  //             return itemDate >= startDateToCompare && itemDate <= endDateToCompare;}
  //           );
  //           console.log("filteredItems after filter::", filteredItems)
  //           };

  //   }

  //   setFilteredBolList(filteredItems);
  // };

  // Checkbox selection handler
  const handleSelectItem = (itemRef: string) => {
    if (selectedItems.includes(itemRef)) {
      setSelectedItems(selectedItems.filter(ref => ref !== itemRef));
    } else {
      setSelectedItems([...selectedItems, itemRef]);
    }
  };


  const onRefresh = async () => {
    setIsFetching(!isFetching);
    const numofBols: string | null = await getFromSecureStore("numBols");
    getBOLs(numofBols);
  }

  const goToPDFViewer = async (item: BOL) => {
    const license = await getFromSecureStore("license");
    console.log("goToPDFViewer", item)
    setFilteredBolList(bolList);
    navigation.navigate('bol_viewer', { TransRefNo: item.TransRefNo, doc_no: item.doc_no, Terminal: item.Terminal, unformattedDate: item.unformattedDate, TransDate: item.TransDate, TransTime: item.TransTime })

  }

  return (
    <>
      <StyledBox flex={1} paddingTop={insets.top} bg='$light200'>
        <Header headerTx='boList.headerTitle' rightButtons={true} withBack={true} onLeftPress={() => navigation.goBack()} onSharePress={() => multipleBols()} />
        <VStack bg='$light100'>
          {/* searchbar */}
          <HStack h="$16" bg='$light200'>
            <HStack flex={1} >
              <HStack flex={5} >
                <View flex={1} >
                  <SearchBar
                    placeholder={i18n.t('boList.placeholderSearch')}
                    value={searchText}
                    onChangeText={(text) => {
                      setSearchText(text)
                      setIsBarLoading(!isBarLoading)
                    }}
                    onClear={() => { setSearchText('') }}
                    round
                    loadingProps={{ "color": "#1F4F7B" }}
                    lightTheme
                    searchIcon={{ size: 24 }}
                    showLoading={!isBarLoading}
                    inputContainerStyle={{ backgroundColor: 'white' }}
                    leftIconContainerStyle={{ backgroundColor: 'white' }}
                    inputStyle={{ backgroundColor: 'white' }}
                    containerStyle={{ height: '100%' }}
                  />
                </View>
              </HStack>

              <HStack flex={.9} bg="#e1e8ee" justifyContent="center" >
                <Pressable onPress={() => { dateRangeSetted ? removeDateRange() : setRangeOpen(true) }} justifyContent='center'>
                  {dateRangeSetted ?
                    <Icon as={CalendarMinus} sx={{ _dark: { color: '' }, _light: { color: '#1F4F7B' } }} size={40} />
                    : <Icon as={CalendarPlus} sx={{ _dark: { color: '' }, _light: { color: '#1F4F7B' } }} size={40} />
                  }
                </Pressable>
              </HStack>
            </HStack>
          </HStack>
          {/* searchbar */}

          {/* list */}
          <VStack   >
            {
              isLoading ? (<ActivityIndicator size="large" color="#0000ff" />) :
                filteredBolList.length > 0 ? (
                  <FlatList
                    data={filteredBolList}
                    onRefresh={() => onRefresh()}
                    refreshing={isFetching}
                    renderItem={({ item }) => (
                      <ListItem
                        onPress={() => goToPDFViewer(item)}
                        item={item}
                        isSelected={selectedItems.includes(item.doc_no)}
                        onSelect={() => handleSelectItem(item.doc_no)} />
                    )} />
                ) : (
                  <VStack bg='$light100' h="91.2%" justifyContent="center" alignItems="center" >
                    <StyledText color="black">{i18n.t('boList.notFound')}</StyledText>
                  </VStack>
                )
            }

          </VStack>
          {/* list  */}
        </VStack>

      </StyledBox>
      <DatePickerModal
        validRange={{ startDate: moment().subtract(90, "days").toDate(), endDate: new Date() }}
        locale="en"
        mode="range"
        visible={rangeOpen}
        onDismiss={onDismiss}
        startDate={range.startDate}
        endDate={range.endDate}
        onConfirm={onChangeRange}
        presentationStyle="pageSheet"
      />
    </>
  );
}
