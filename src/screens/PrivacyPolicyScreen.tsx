import { StyledBox } from '../components/styledComponents/index';
import { Header } from "../components/header/Header";
import ButtonGroup from '../components/buttons/ButtonGroup';
import { menuButtons } from '../utilities/menuButtons';

export default function PrivacyPolicyScreen({ route, navigation }) {
    const goBack = () => navigation.goBack();
    return (
        <StyledBox flex={1} >
            <Header headerTx='bigMenu.privacyPolicy' withBack={true} leftIcon="back" onLeftPress={goBack} />
          <ButtonGroup buttons={menuButtons} navigation={navigation}/>
        </StyledBox>
    )
};