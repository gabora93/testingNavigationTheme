import { StatusBar } from 'expo-status-bar';
import { ShareIcon, Icon, FlatList, ScrollView, Text, HStack, styled} from '@gluestack-ui/themed';

export default function MenuScreen({ route, navigation }) {
    console.log(route)
    const StyledHStack = styled(HStack, {
        justifyContent: "center",
        height: '$16',
        backgroundColor: "#1F4F7B",
        _dark: {
          backgroundColor: "#1F4F7B",
        },
      });
    
    return (
        <>
          <StatusBar />
          <StyledHStack >
         
          </StyledHStack>
        </>
      )
    }
    