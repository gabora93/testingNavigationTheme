import React, { FC, useState, useCallback, useEffect } from "react";
import { TextStyle, Dimensions, ViewStyle, Platform, TouchableOpacity, StyleSheet, FlatList, LogBox, Animated, Easing, ActivityIndicator } from "react-native"
import { StyledBox } from '../components/styledComponents/index';
import { Header } from "../components/header/Header";
import { SearchBar } from '@rneui/themed';
import { Button, ButtonText, Box, Pressable, Icon, HStack, VStack, Heading, Text, View } from '@gluestack-ui/themed';
import { Menu, RefreshCcw, CalendarMinus, CalendarPlus } from 'lucide-react-native';
import { BOL, DATAA } from "../types/types";
import { spin } from "../animations/spin";
import { rotation } from "../animations/animatedValues";
import { DatePickerModal } from 'react-native-paper-dates';
import moment from "moment";
import { de, en, es, fr, it, nl, pl, registerTranslation, TranslationsType } from 'react-native-paper-dates';
import { DocumentList } from '../components/DocumentList/DocumentList';
import PDFIcon from "../components/DocumentList/PDFIcon";
import { DATAJSON } from "../components/DocumentList/data";
import  Parent  from '../components/DocumentList/Parent';
export default function BOLScreen({ navigation }) {

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
  const goToSettings = () => navigation.navigate("settings", { bolList: true, refreshList: refreshList });
  const goBack = () => navigation.goBack();

  const filterData = () => {
    let filteredItems = data;
    console.log('filtered', filteredItems)
    // Apply text filter
    if (searchText) {
      console.log('Apply text filter')
      console.log('SEARCH TEXT::::::::::::', searchText)
      console.log('BOLIST', filteredItems)
      filteredItems = data.filter((item: DATAA) =>
        item.avatarUrl.toUpperCase().includes(searchText.toUpperCase()) ||
        item.recentText.toUpperCase().includes(searchText.toUpperCase()) ||
        item.fullName.toUpperCase().includes(searchText.toUpperCase())
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
        filteredItems = filteredItems.filter((item: BOL) => {
          const itemDate = new Date(moment(item.TransDate, 'YYYY/MM/DD').format("YYYY-MM-DD"))
          return itemDate >= startDateToCompare && itemDate <= endDateToCompare;
        }
        );
        console.log("filteredItems after filter::", filteredItems)
      };
    }
    console.log("filteredItems after filter::", filteredItems)
    setFilteredData(filteredItems);
  };


  // let dateRangeSetted = (range.endDate != undefined && range.startDate != undefined)

  //state for bols data
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
   
        const response = await fetch('https://mpaccd5d24bf776f73a2.free.beeceptor.com/data');
        const result = await response.json();
        console.log(result)
        setData(result); // 
        setFilteredData(result);
        setIsLoading(false)
        setEmptyBOLS(false)
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount

  const [filteredData, setFilteredData] = useState<BOL[]>([]);
  const [searchText, setSearchText] = useState('');
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
    setFilteredData(data);
    if (searchText != '') {
      console.log('search', searchText)
      filterData()
    }
  }

  React.useEffect(() => {
    filterData();
  }, [searchText, range]);

  const handleSelect = (id) => {
    const newSelectedItems = filteredData.includes(id)
      ? selectedItems.filter(item => item !== id)
      : [...selectedItems, id];
    setSelectedItems(newSelectedItems);
  };
  const selectedd = () => {
    console.log(selectedItems)
  };

  return (
    <>
      <StyledBox flex={1} >
        <Header headerTx='boList.headerTitle' rightButtons={true} withBack={true} onLeftPress={() => navigation.goBack()} onSharePress={() => selectedd()} />
        <VStack>
          {/* searchbar */}
          <HStack h="$16">
            <HStack flex={1} $light-bg='#e0e8ee'>
              <HStack flex={5} >
                <View flex={1}>
                  <SearchBar
                    value={searchText}
                    onChangeText={(text: string) => setSearchText(text)}
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
          <VStack  >
            { isLoading ? <ActivityIndicator size="large" /> : 
            ( error ? <View><Text>Error: {error}</Text></View> 
            :  
            <DocumentList data={filteredData} selectedItems={selectedItems} onItemSelect={handleSelect} onLeftPress={undefined}  />
            )} 
        
            
            
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
