import { StyledBox } from '../components/styledComponents/index';
import { Header } from "../components/header/Header";
import ButtonGroup from '../components/buttons/ButtonGroup';
import { menuButtons } from '../utilities/menuButtons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SettingsScreen({ route, navigation }) {
    const insets = useSafeAreaInsets();

    return (
        <StyledBox flex={1} paddingTop={insets.top} bg='#1F4F7B'>
            <Header headerTx='bigMenu.settings' withBack={true} onLeftPress={() => navigation.goBack()} />
        </StyledBox>
    )
};