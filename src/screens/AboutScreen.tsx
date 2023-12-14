import { StyledBox } from '../components/styledComponents/index';
import { Header } from "../components/header/Header";
import ButtonGroup from '../components/buttons/ButtonGroup';
import { menuButtons } from '../utilities/menuButtons';

export default function AboutScreen({ route, navigation }) {
    return (
        <StyledBox flex={1} >
            <Header headerTx='bigMenu.about' />
        </StyledBox>
    )
};