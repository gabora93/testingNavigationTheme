import React, { useState, useEffect } from 'react';
import { DocumentListProps } from "./DocumentList.props"
import { Menu, FileText, CheckCheck, Container } from 'lucide-react-native';
import { i18n } from '../../i18n/i18n';
import { Center, Icon, Checkbox, CheckboxIndicator, CheckboxIcon, CheckIcon, CheckboxLabel, Pressable } from "@gluestack-ui/themed"
import { translate } from "../../i18n/"
import { StatusBar } from 'expo-status-bar';
import { StyledHS, StyledText, StyledBox } from '../styledComponents/index';
import { StyledLinearGradient } from '../styledComponents/StyledLinearGradient';
import GradientIcon from '../styledComponents/GradientIcon';
import { FlatList, Box, Heading, VStack, HStack, Avatar, AvatarImage, Text, View } from '@gluestack-ui/themed';
import PDFIcon from "./PDFIcon";
import { Dimensions } from 'react-native';

import { DATAA } from '../../types/types'
import ListItem from './ListItem';

export function DocumentList({ onLeftPress, data, selectedItems, onItemSelect }) {
  
  const renderItem = ({ item }) => {
    return (
      <ListItem
        item={item}
        isSelected={selectedItems.includes(item.id)}
        onSelect={() => onItemSelect(item.id)}
      />
    )
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
    contentContainerStyle={{ flexGrow: 1, paddingBottom: 5 }}
      data={data}
      keyExtractor={(item) => item.doc_no.toString()}
      ItemSeparatorComponent={ItemSeparatorView}
      renderItem={renderItem}
      ListFooterComponent={<View h={42} />}
      ListHeaderComponent={<View h={2} />}
    />
  )
};