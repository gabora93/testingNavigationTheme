import React, { useState, useEffect } from 'react';
import { DocumentListProps } from "./DocumentList.props"
import { Menu, FileText, CheckCheck, Check } from 'lucide-react-native';
import { i18n } from '../../i18n/i18n';
import { Center, Icon, Checkbox, CheckboxIndicator, CheckboxIcon, CheckIcon, CheckboxLabel, Pressable } from "@gluestack-ui/themed"
import { translate } from "../../i18n/"
import { StatusBar } from 'expo-status-bar';
import { StyledHS, StyledText, StyledBox } from '../styledComponents/index';
import { StyledLinearGradient } from '../styledComponents/StyledLinearGradient';
import { FlatList, Box, Heading, VStack, HStack, Avatar, AvatarImage, Text, View } from '@gluestack-ui/themed';
import PDFIcon from "./PDFIcon";
import { StyleSheet, TouchableOpacity } from 'react-native';

const ListItem = ({ item, isSelected, onSelect, onPress }) => {
  return (
    <Pressable h={100} borderBottomWidth="$1" borderColor="$darkBlue600" flexDirection='row'>
  
  <StyledLinearGradient onTouchEnd={onSelect} flex={0.5}  justifyContent='center' alignItems='center' 
       start={[1, 0]} end={[0, 0]} colors={['$light100','$light100', '#4444']} >
        <VStack justifyContent="center" alignItems="center" >
            <Icon as={PDFIcon} size="xl" h={55} w={55}/>
        </VStack>
        <VStack flex={1} justifyContent='center' alignItems='center'>
            <StyledText color='black' fontSize="$2xs" numberOfLines={1}
    adjustsFontSizeToFit  >
                {item.doc_no}
            </StyledText>
        </VStack>
        </StyledLinearGradient>

    <Pressable flex={2} onPress={onPress} >
        <VStack   justifyContent='center' h="$full" margin='auto'>
            <Text flex={1} color='black' numberOfLines={1} fontSize="$md"
            adjustsFontSizeToFit  >{item.TransDate}</Text>
            
            <Text flex={1} fontSize="$md" color='black' numberOfLines={1}
            adjustsFontSizeToFit >{item.Terminal}</Text>
            <Text flex={1} fontSize="$md" color='black' numberOfLines={1}
            adjustsFontSizeToFit >RefNo: {item.TransRefNo}</Text>

            <Text flex={1} fontSize="$md" color='black' numberOfLines={1}
            adjustsFontSizeToFit >Truck: {item.truck}</Text>
            
            <Text flex={1} fontSize="$md" color='black' numberOfLines={1}
            adjustsFontSizeToFit >Trailer: -{item.trailer1}-{item.trailer2}-{item.trailer3}</Text>
        </VStack>
    </Pressable>
    <StyledLinearGradient onTouchEnd={onSelect} flex={0.5}  justifyContent='center' alignItems='center' 
       start={[0.5, 0]} end={[1, 0]} opacity="$80" colors={isSelected ? ['$light100','$light100', '#acd0d9'] : ['$light100', '$light100'] } >

    <Pressable onPress={onSelect} flex={0.5}  justifyContent='center' alignItems='center' >
        <View style={[styles.checkboxBase, isSelected && styles.checkboxChecked]} onPress={onSelect} >
            {isSelected && <Icon as={Check} size={24} color="white" />}
        </View>
    </Pressable>
    </StyledLinearGradient>

</Pressable>
  );
};

const styles = StyleSheet.create({
  checkboxBase: {
    width: 30,
    height: 30,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#1f4f7b',
    backgroundColor: 'transparent',
    margin: 'auto',
  },
  checkboxChecked: {
    backgroundColor: '#1f4f7b',
  }


});

export default ListItem;