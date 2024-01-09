import { TextStyle, ViewStyle, View, ImageStyle, ActivityIndicator } from "react-native"
import { WebView } from 'react-native-webview';
import { i18n } from "../i18n/i18n"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyledBox, StyledText } from '../components/styledComponents/index';
import { Header } from "../components/header/Header";

const HEADER: TextStyle = {
    paddingTop: 5,
    paddingBottom: 4 - 1,
    paddingHorizontal: 0,
    backgroundColor: "#1f4f7b",
}
const BOLD: TextStyle = { fontWeight: "bold" }
const HEADER_TITLE: TextStyle = {
    ...BOLD,
    fontSize: 18,
    lineHeight: 15,
    textAlign: "center",
    letterSpacing: 1.5,
    paddingTop: 1,
    paddingLeft: 5,
    right: 4
}
export default function PrivacyPolicyScreen({ route, navigation }) {
    const insets = useSafeAreaInsets();
    const goBack = () => navigation.goBack();
    return (
        <StyledBox flex={1} paddingTop={insets.top} bg='#1F4F7B' >
            <Header
                            headerTx="privacyPolicy.headerTitle"
                            style={HEADER}
                            titleStyle={HEADER_TITLE}
                            leftIcon="back"
                            withBack={true}
                            onLeftPress={goBack}
                        />
                        <WebView
                            source={{ uri: 'https://toptech.com/privacy-statement/saas-privacy-notice/' }}
                            style={{ marginTop: 1 }}
                            startInLoadingState={true}
  renderLoading={() => <ActivityIndicator  style={{ marginBottom: '50%' }} />}

                        />
                  
        </StyledBox>
    )
};