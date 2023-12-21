import { StyledBox } from '../components/styledComponents/index';
import { Header } from "../components/header/Header";
import ButtonGroup from '../components/buttons/ButtonGroup';
import { menuButtons } from '../utilities/menuButtons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function PrivacyPolicyScreen({ route, navigation }) {
    const insets = useSafeAreaInsets();
    const goBack = () => navigation.goBack();
    return (
        <StyledBox flex={1} paddingTop={insets.top} bg='#1F4F7B' >
            <Header headerTx='bigMenu.privacyPolicy' withBack={true} leftIcon="back" onLeftPress={goBack} />
          <ButtonGroup buttons={menuButtons} navigation={navigation}/>
        </StyledBox>
    )
};