import { StyledBox } from '../components/styledComponents/index';
import { Header } from "../components/header/Header";
import ButtonGroup from '../components/buttons/ButtonGroup';
import { menuButtons } from '../utilities/menuButtons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { VStack } from '@gluestack-ui/themed';

export default function MenuScreen({ route, navigation }) {
    const insets = useSafeAreaInsets();

    return (
        <StyledBox flex={1} paddingTop={insets.top} bg='#1F4F7B' >
            <Header headerTx='bigMenu.headerTitle' />
            <VStack flex={1} $light-bg='$light200'>
                <ButtonGroup buttons={menuButtons} navigation={navigation} space={'xl'} buttonHeight={'$1/6'} />
            </VStack>
        </StyledBox>
    )
};