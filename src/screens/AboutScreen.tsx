import { Header } from "../components/header/Header";
import ButtonGroup from '../components/buttons/ButtonGroup';
import { menuButtons } from '../utilities/menuButtons';
import { ImageStyle, TextStyle, ViewStyle, Linking } from "react-native";
import { Center, Icon, View, Image, Text, CheckIcon, CheckboxLabel, Pressable } from "@gluestack-ui/themed"
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyledHS, StyledText, StyledBox } from '../components/styledComponents/index';
import topTechLogo from "./toptechLogo.png";
import { VERSION } from "../constants";
import { i18n } from "../i18n/i18n";


const TITLE_STYLE: TextStyle = {
    color: 'black',
    fontSize: 24,
}

const LINK_STYLE: TextStyle = {
    color: '#3F97D4',
    fontSize: 24,
    marginTop: 1
}
const TITLE_CONTAINER: ViewStyle = {
    flex: 1,
    alignItems: 'center',
    top: 5,
    height: '100%',
    width: "100%",
}
const LOAD_STYLE: ViewStyle = {
    marginTop: "$10",
    alignItems: 'center',
}
const LOGO: ImageStyle = {
    height: 70,
    width: 250,
    marginTop: 5
}

const BOLD: TextStyle = { fontWeight: "bold" }

export default function AboutScreen({ route, navigation }) {
    const insets = useSafeAreaInsets();
    const goBack = () => navigation.goBack()

    return (
        <StyledBox flex={1} paddingTop={insets.top} bg='$light100' gap="$20">
            <Header headerTx='bigMenu.about' leftIcon="back" withBack={true}
                onLeftPress={goBack} />
            <View style={LOAD_STYLE} gap="$1.5">
                <StyledText fontSize={20} color="black">LOAD2DAY®</StyledText>

                <StyledText fontSize={20} color="black">DRIVER CONNECT</StyledText>

            </View>

            <View style={TITLE_CONTAINER} gap="$12">
                <Image source={topTechLogo} style={LOGO} resizeMode={"contain"} />
                {/* <Text style={SUBTITLE_STYLE} text="Toptech Systems Inc." /> */}
                
                <StyledText color="black" onPress={() => Linking.openURL('http://toptech.com')}>www.toptech.com</StyledText>
                <StyledText color="black">{i18n.t('common.support')}</StyledText>
                <StyledText color="black" onPress={() => Linking.openURL('mailto:us-support@toptech.com')}>us-support@toptech.com</StyledText>

                <StyledText color="black">{`V. ${VERSION}`}</StyledText>
            </View>

        </StyledBox>
    )
};



