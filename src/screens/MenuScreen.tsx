import { VStack, HStack, Button, ButtonText, Divider, Box} from '@gluestack-ui/themed';
import { StyledBox, StyledButton, StyledButtonText } from '../components/styledComponents/index';
import { Header } from "../components/header/Header";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function MenuScreen({ route, navigation }) {
    return (
        <Box  borderColor='red' borderRadius="$2xl" borderWidth="$2" flex={1}>
        <Header headerTx='bigMenu.headerTitle'/>
          
            <HStack w="$full" h="$full"   justifyContent='center' borderColor='black'  alignItems="center" borderRadius="$2xl" borderWidth="$2">
            <VStack alignItems="center"  h='$5/6'  borderColor='green' borderRadius="$2xl" borderWidth="$2">
            <StyledButton variant="solid" h='$1/3' w="$1/2">
                <StyledButtonText>Hola</StyledButtonText>
              </StyledButton>
<Divider  h="$2"/>
              <StyledButton variant="solid" h='$1/3'>
                <StyledButtonText>Hola</StyledButtonText>
              </StyledButton>
            </VStack>
            </HStack>
          
        </Box>
      )
    }
    