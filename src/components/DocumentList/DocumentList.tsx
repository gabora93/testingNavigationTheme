
import { FlatList, Box, Heading, VStack, HStack, Avatar, AvatarImage, Text, View  } from '@gluestack-ui/themed';
import ListItem from './ListItem';
import { TextStyle, Dimensions, ViewStyle, Platform, TouchableOpacity, StyleSheet, LogBox, Animated, Easing, ActivityIndicator } from "react-native"


export function DocumentList({ onLeftPress, filteredBolList, selectedItems, onItemSelect, isLoading }) {
  
  const renderItem = ({ item }) => {
    console.log('DOCUMENT LIST ITEM',item)
    return (
      <ListItem
        item={item}
        isSelected={selectedItems.includes(item.id)}
        onSelect={(item) => onItemSelect(item.id)}
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
console.log('filteredBolList', filteredBolList)
  // return (
    
  //   <FlatList
  //   contentContainerStyle={{ flexGrow: 1, paddingBottom: 5 }}
  //     data={data}
  //     keyExtractor={(item) => item.doc_no.toString()}
  //     ItemSeparatorComponent={ItemSeparatorView}
  //     renderItem={(item) => renderItem(item)}
  //     ListFooterComponent={<View h={42} />}
  //     ListHeaderComponent={<View h={2} />}
  //   />
  // )

  return  (  isLoading ? (
    <ActivityIndicator size="large" color="#0000ff" />
) : filteredBolList.length > 0 ? (
    <FlatList
        data={filteredBolList}
        renderItem={(item) => renderItem(item)}
        keyExtractor={item => item.doc_no}
    />
) : (
    <Text>You have no BOLs</Text>
))
};