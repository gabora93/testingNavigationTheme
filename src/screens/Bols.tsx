import React, { FC, useState, useCallback, useEffect } from "react";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextStyle, Dimensions, ViewStyle, Platform, TouchableOpacity, StyleSheet, FlatList, LogBox, Animated, Easing, ActivityIndicator } from "react-native"
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

type BOLICO = {
  Terminal: string;
  TransDate: string;
  TransRefNo: string;
  TransTime: string;
  doc_no: string;
  trailer1: string;
  trailer2: string;
  trailer3: string;
  truck: string;
  unformattedDate: string;
  BLOB?: string;
};

export default function BOLScreen({ navigation }) {
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



  // const filterData = () => {
  //   let filteredItems = data;
  //   console.log('filtered', filteredItems)
  //   // Apply text filter
  //   if (searchText) {
  //     console.log('Apply text filter')
  //     console.log('SEARCH TEXT::::::::::::', searchText)
  //     console.log('BOLIST', filteredItems)
  //     filteredItems = data.filter((item: DATAA) =>
  //       item.avatarUrl.toUpperCase().includes(searchText.toUpperCase()) ||
  //       item.recentText.toUpperCase().includes(searchText.toUpperCase()) ||
  //       item.fullName.toUpperCase().includes(searchText.toUpperCase())
  //     );
  //     console.log('filteredItems', filteredItems)
  //   }
  //   // Apply date filter
  //   if (startDate && endDate) {
  //     console.log('Apply DATE filter')
  //     let startDateToCompare: Date;
  //     let endDateToCompare: Date;
  //     if (range.startDate != undefined && range.endDate != undefined) {
  //       let startingDate = moment(range.startDate);
  //       let startDateComponent = startingDate.utc().format('YYYY-MM-DD');
  //       startDateToCompare = new Date(startDateComponent.toString());

  //       let endingDate = moment(range.endDate).subtract(1, "days");
  //       let endDateComponent = endingDate.utc().format('YYYY-MM-DD');
  //       endDateToCompare = new Date(endDateComponent.toString());
  //       console.log('startDateComponent', startDateComponent)
  //       console.log('endDateComponent', endDateComponent.toString());
  //       // Inserted text is not blank
  //       // Filter the masterDataSource
  //       // Update FilteredDataSource
  //       console.log("filteredItems before filter::", filteredItems)
  //       filteredItems = filteredItems.filter((item: BOL) => {
  //         const itemDate = new Date(moment(item.TransDate, 'YYYY/MM/DD').format("YYYY-MM-DD"))
  //         return itemDate >= startDateToCompare && itemDate <= endDateToCompare;
  //       }
  //       );
  //       console.log("filteredItems after filter::", filteredItems)
  //     };
  //   }
  //   console.log("filteredItems after filter::", filteredItems)
  //   setFilteredData(filteredItems);
  // };


  // let dateRangeSetted = (range.endDate != undefined && range.startDate != undefined)

  //state for bols data

  const [isLoading, setIsLoading] = useState(false);

  const [bolList, setBolList] = useState<BOLICO[]>([]);
  const [filteredBolList, setFilteredBolList] = useState<BOLICO[]>([]);
  const [searchText, setSearchText] = useState('');
  const [selectedDates, setSelectedDates] = useState({ start: '', end: '' });
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const [error, setError] = useState(null);
  const documents: BOLICO[] = BOLS;

  // useEffect(() => {

  //   fetchData().then((filteredBolList) => { console.log('sss', filteredBolList) })
  // }, []); // Empty dependency array means this effect runs once on mount
  // const fetchData = async () => {
  //   try {
  //     setIsLoading(true);

  //     setBolList(documents);
  //     setFilteredBolList(documents);
  //     console.log('DOCUMENT', documents)
  //     console.log('bol list', bolList)
  //     console.log('bol list', filteredBolList)
  //     setIsLoading(false); // End loading
  //   } catch (error) {
  //     console.error(error);
  //     setIsLoading(false); // End loading in case of error
  //   }
  // };


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

  useEffect(() => {
    if (searchText) {
        filterData();
    } else {
        setFilteredBolList(bolList);
    }
}, [searchText, bolList]);

  const filterData = () => {
    // Combine text and date filtering
    let data = bolList.filter(bol => 
        (searchText ? 
            (bol.Terminal.includes(searchText) ||
            bol.doc_no.includes(searchText) ||
            bol.truck.includes(searchText) ||
            bol.trailer1.includes(searchText) ||
            bol.trailer2.includes(searchText) ||
            bol.trailer3.includes(searchText)) : true) &&
        (bol.TransDate >= selectedDates.start && bol.TransDate <= selectedDates.end)
    );
    setFilteredBolList(data);
};


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
    console.log('number of bols',numofBols)
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
        maxNumberOfBOLs: numBols
      };

      const response = await BolService.getBOLS(body)
      if (response.data.result[0].Status === "FILE_NOT_FOUND") {
        console.log("NO_TRANSACTIONS_FOUND")
        setEmptyBOLS(true)
      } else {
        if (response.data.result == null) {
          console.log("NULL")
          setEmptyBOLS(true)
        } else {
          // const bolArray: BOL[] = Object.values(response.data.result[0].BOLs).filter(function (x) {
          //   return x.Terminal !== undefined
          // });
          const bolArray: BOL[] = Object.values(documents).filter(function (x) {
            return x.Terminal !== undefined
          });
          bolArray.map((bol) => (bol.unformattedDate = bol.TransDate + ' ' + bol.TransTime, bol.selected = false))
          bolArray.map((i) => (i.TransDate = moment(i.TransDate, 'YYMMDD').format("YYYY/MM/DD"), i.TransTime = moment(i.TransTime, "HHmm").format("HH:mm")));
          console.log('bolarray', bolArray)
          setBolList(bolArray);
          setFilteredBolList(bolArray);
          setIsLoading(false)
          setEmptyBOLS(false)
        }

      }
    } catch (error) {
      console.log("error", error)
      console.log("error type of", typeof (error))
      const bolArray: BOL[] = Object.values(documents).filter(function (x) {
        return x.Terminal !== undefined
      });
      bolArray.map((bol) => (bol.unformattedDate = bol.TransDate + ' ' + bol.TransTime, bol.selected = false))
      bolArray.map((i) => (i.TransDate = moment(i.TransDate, 'YYMMDD').format("YYYY/MM/DD"), i.TransTime = moment(i.TransTime, "HHmm").format("HH:mm")));
      console.log('bolarray', bolArray)
      setBolList(bolArray);
      setFilteredBolList(bolArray);
    }
  }

  
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

  const selectedd = () => {
    console.info('selected items: ', selectedItems)
  }


  return (
    <>
      <StyledBox flex={1} paddingTop={insets.top} bg='#1F4F7B'>
        <Header headerTx='boList.headerTitle' rightButtons={true} withBack={true} onLeftPress={() => navigation.goBack()} onSharePress={() => selectedd()} />
        <VStack bg='$light100'>
          {/* searchbar */}
          <HStack h="$16" bg='$light200'>
            <HStack flex={1} >
              <HStack flex={5} >
                <View flex={1}>
                  <SearchBar
                    placeholder={i18n.t('boList.placeholderSearch')}
                    value={searchText}
                    onChangeText={(text) => setSearchText(text)}
                    onClear={() => setSearchText('')}
                    round
                    lightTheme
                    searchIcon={{ size: 24 }}
                    inputContainerStyle={{ backgroundColor: 'white' }}
                    leftIconContainerStyle={{ backgroundColor: 'white' }}
                    inputStyle={{ backgroundColor: 'white' }}
                  />
                </View>
              </HStack>

              <HStack flex={1.5} >
                <Pressable onPress={() => { dateRangeSetted ? removeDateRange() : setRangeOpen(true) }} justifyContent='center'>
                  {dateRangeSetted ?
                    <Icon as={CalendarMinus} sx={{ _dark: { color: '' }, _light: { color: '#1F4F7B' } }} size={40} />
                    : <Icon as={CalendarPlus} sx={{ _dark: { color: '' }, _light: { color: '#1F4F7B' } }} size={40} />
                  }
                </Pressable>
                <Pressable onPress={() => { spin() }} justifyContent='center'>
                  <Animated.View style={[{ transform: [{ rotate }] }]} >
                    <Icon as={RefreshCcw} sx={{ _dark: { color: '' }, _light: { color: '#1F4F7B' } }} size={40} />
                  </Animated.View>
                </Pressable>
              </HStack>
            </HStack>
          </HStack>
          {/* searchbar */}


          {/* list */}
          <VStack   >
            {
              isLoading ? ( <ActivityIndicator size="large" color="#0000ff" /> ) : 
              filteredBolList.length > 0 ? (
                <FlatList
                  data={filteredBolList}
                  renderItem={({ item }) => (
                    <ListItem
                      item={item}
                      isSelected={selectedItems.includes(item.TransRefNo)}
                      onSelect={() => handleSelectItem(item.TransRefNo)} />
                  )}/>
              ) : ( 
                <VStack bg='$light100' h="91.2%" borderWidth={2} justifyContent="center" alignItems="center" >
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
