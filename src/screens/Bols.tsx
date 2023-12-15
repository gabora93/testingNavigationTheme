import React, { FC, useState, useCallback } from "react";
import { TextStyle, Dimensions, ViewStyle, Platform, TouchableOpacity, StyleSheet, FlatList, LogBox, Animated, Easing } from "react-native"
import { StyledBox } from '../components/styledComponents/index';
import { Header } from "../components/header/Header";
import { SearchBar } from '@rneui/themed';
import { Button, ButtonText, Box, Pressable, Icon, HStack, VStack, Heading, Text, View } from '@gluestack-ui/themed';
import { Menu, RefreshCcw, CalendarMinus, CalendarPlus } from 'lucide-react-native';
import { BOL } from "../types/types";
import { spin } from "../animations/spin";
import { rotation } from "../animations/animatedValues";

export default function BOLScreen({ navigation }) {

  const goToSettings = () => navigation.navigate("settings", { bolList: true, refreshList: refreshList });
  const goBack = () => navigation.goBack();

  // let dateRangeSetted = (range.endDate != undefined && range.startDate != undefined)

  //state for bols data
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState<BOL[]>([]);
  const [searchText, setSearchText] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [rangeOpen, setRangeOpen] = useState(false)
  const [numberOfBols, setNumberOfBols] = React.useState<string | null>('');
  const [refreshCount, setRefreshCount] = React.useState(0);
  const [emptyBOLS, setEmptyBOLS] = React.useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);

  const rotate = rotation.interpolate({ inputRange: [0, 1], outputRange: ['360deg', '0deg'] });

  return (
    <>
      <StyledBox flex={1} >
        <Header headerTx='boList.headerTitle' withBack={true} onLeftPress={() => navigation.goBack()} />
        <HStack>
          <HStack flex={1} $light-bg='#e0e8ee'>
            <HStack flex={5} >
              <View flex={1}>
                <SearchBar
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
              <Pressable onPress={() => { }} justifyContent='center'>
                <Icon as={CalendarPlus} sx={{ _dark: { color: '' }, _light: { color: '#1F4F7B' } }} size={40} />
              </Pressable>
              <Pressable onPress={() => {spin() }} justifyContent='center'>
              <Animated.View style={[{ transform: [{ rotate }] }]} >
                <Icon as={RefreshCcw} sx={{ _dark: { color: '' }, _light: { color: '#1F4F7B' } }} size={40} />
                </Animated.View>
              </Pressable>
            </HStack>
          </HStack>
        </HStack>
        <VStack >
            <Text>s</Text>
            <Text>s</Text>
            <Text>s</Text>
            <Text>s</Text>
            <Text>s</Text>
        </VStack>
      </StyledBox>
    </>
  );
}
