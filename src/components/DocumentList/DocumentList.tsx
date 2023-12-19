import React, { useState, useEffect } from 'react';
import { DocumentListProps } from "./DocumentList.props"
import { Menu, FileText, CheckCheck, Container } from 'lucide-react-native';
import { i18n } from '../../i18n/i18n';
import { Center, Icon, Checkbox, CheckboxIndicator, CheckboxIcon, CheckIcon } from "@gluestack-ui/themed"
import { translate } from "../../i18n/"
import { StatusBar } from 'expo-status-bar';
import { StyledHS, StyledText, StyledBox } from '../styledComponents/index';
import { StyledLinearGradient } from '../styledComponents/StyledLinearGradient';
import GradientIcon from '../styledComponents/GradientIcon';
import { FlatList, Box, Heading, VStack, HStack, Avatar, AvatarImage, Text, View } from '@gluestack-ui/themed';
import { data } from "./data";
import PDFIcon from "./PDFIcon";
import { Dimensions } from 'react-native';


export function DocumentList(props: DocumentListProps) {
  const { onLeftPress } = props;
  const [fontSize, setFontSize] = useState(20);

  const adjustFontSize = (width, maxWidth) => {
    if (width > maxWidth) {
      setFontSize(prevFontSize => prevFontSize - 1);
    }
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 2,
          width: '100%',
          backgroundColor: "#1f4f7b",
        }}
      />
    );
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item: any) => item.fullName}
      ItemSeparatorComponent={ItemSeparatorView}
      renderItem={({ item, index }) => (
        <HStack h={96} flex={1} borderWidth={2}>

          <VStack borderWidth={1} borderColor="green" flex={1.5}>

            <VStack justifyContent="center" alignItems="center" flex={1}>
              <Icon as={PDFIcon} size="xl" h={55} w={55} />
            </VStack>

            <VStack borderWidth={1} borderColor="blue" w="$full" h="$2/6" justifyContent='center' alignItems='center'  >

              <StyledText color='black' fontSize="$2xs">
                232093202
              </StyledText>
            </VStack>

          </VStack>

          <VStack borderRightWidth={1} borderColor="red" flex={6}>
            <Text w="$full">23/11/21 13:23</Text>
            <Text w="$full">Terminal</Text>
            <Text w="$full">Truck: 23239ASAS</Text>
            <Text w="$full">Trailer: 323AS</Text>
          </VStack>

          <VStack borderRightWidth={1} borderColor="red" flex={1.2}>
            
          <Checkbox value='' size={'lg'} isInvalid={false} isDisabled={false}   >
            <CheckboxIndicator mr="$2">
              <CheckboxIcon as={CheckIcon} />
            </CheckboxIndicator>
          </Checkbox>
      
          </VStack>

        </HStack>
      )}
      ListFooterComponent={<View h={42} />}
      ListHeaderComponent={<View h={2} />}
    />
  )
};