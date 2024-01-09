import React, { FC } from "react";
import { ScrollView, Dimensions, TouchableOpacity, ViewStyle, TextStyle, ImageStyle, Alert, Linking, ActivityIndicator } from 'react-native';
import { Image, Icon, Input, InputField, styled, Pressable, VStack, Center, HStack, View, Text, KeyboardAvoidingView, Box } from '@gluestack-ui/themed'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { StyledBox, StyledButton, StyledButtonText, StyledText } from '../components/styledComponents/index';
import AuthService from "../services/axiosapi/AuthService";
import { AuthContext } from '../context/AuthContext';
import WebView from "react-native-webview";
import { getFromSecureStore, saveOnSecureStore, deleteKeySecureStore } from "../services/helper";
import { i18n } from '../i18n/i18n';
import { Header } from "../components/header/Header";
import { NavigationState } from '@react-navigation/native';


const button: ViewStyle = {
  backgroundColor: "#1f4f7b",
  borderRadius: 5,
  padding: 20,
  marginLeft: wp(4),
  marginRight: wp(4)
}
const button2: ViewStyle = {
  backgroundColor: "#1f4f7b",
  borderRadius: 5,
  padding: 20,
  marginTop: hp(2),
  marginLeft: wp(4),
  marginRight: wp(4)
}
const buttonDisabled: ViewStyle = {
  backgroundColor: '#999',
  borderRadius: 5,
  padding: 20,
  marginLeft: wp(4),
  marginRight: wp(4)
}
const buttonDisabled2: ViewStyle = {
  backgroundColor: '#999',
  borderRadius: 5,
  padding: 20,
  marginTop: hp(2),
  marginLeft: wp(4),
  marginRight: wp(4)
}
const buttonLabel: TextStyle = {
  fontSize: 14,
  color: '#FFF',
  alignSelf: 'center'
}
const TITLE: TextStyle = {
  fontSize: 22,
  alignSelf: 'center',
  top: hp(2)
}
const tcP: TextStyle = {
  marginTop: 10,
  marginBottom: 10,
  fontSize: 12
}
const tcL: TextStyle = {
  marginLeft: 10,
  marginTop: 10,
  marginBottom: 10,
  fontSize: 12
}
const tcLs: TextStyle = {
  marginLeft: 14,
  marginTop: 10,
  marginBottom: 10,
  fontSize: 12
}
const tcContainer: ViewStyle = {
  marginTop: 15,
  marginBottom: 10,
  height: hp('60%')
}
const tcContainerScroll: ViewStyle = {
  marginTop: 15,
  marginBottom: 10,
  height: hp('60%')
}
const LOGO: ImageStyle = {
  height: 50,
  width: 200,
  alignSelf: "flex-start",
  marginLeft: 2,
  marginTop: 3
}
const HEADER: TextStyle = {
  paddingTop: 4,
  paddingBottom: 4,
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
  paddingTop: 1
}
const LINK_STYLE: TextStyle = {
  color: 'blue',
  fontSize: 16,
  textDecorationLine: 'underline',
  marginTop: 4

}
const initialState = {
  accepted: true
}
const TermsScreen = ({ navigation, route }) => {

  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const [state, setState] = React.useState(initialState);
  const { signOut } = React.useContext(AuthContext);

  const refresh = () => navigation.navigate("terms")
  const goBack = () => navigation.goBack()

  React.useEffect(()=>{
    console.log('navigation',navigation)

  }, [])

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };


  const logOut = async () => {
    console.log("logging out, deleting securestore")
    deleteKeySecureStore("license")
    deleteKeySecureStore("firstName")
    deleteKeySecureStore("lastName")
    deleteKeySecureStore("userEmail")
    deleteKeySecureStore("jwt")
    deleteKeySecureStore("temporal_token")
    signOut();
    navigation.navigate("loginCredentials")
  }

  

  const alertTerms = () => {
    Alert.alert(i18n.t('generalAlarms.youHaveToAcceptThis'), "", [
      {
        text: "OK", onPress: () => {
          logOut()
          navigation.navigate("login")
        }
      }
    ]);
  };
  const { acceptTermsAndConditions } = AuthService();


  const acceptTerms = async () => {
    console.log("accepting terms...");
    const email = await getFromSecureStore("userEmail");
    // const email = await getFromSecureStore("userEmail");
    console.log("email", email);
    let body = {
      userName: email
    };

    const response = await acceptTermsAndConditions(body)
    console.log("response accept terms", response.data)
    if (response.data.result[0].Status === "SUCCESS") {
      Alert.alert(i18n.t('generalAlarms.youHaveAcceptedTermsSccessfully'), "", [
        { text: "OK", onPress: () => {
          navigation.navigate('IndexStack', {screen: 'Home'})
          // navigation.navigate('Home')
        } }
      ]);
    }

  }
  // Pull in navigation via hook
  // const navigation = useNavigation()
  const { height, width } = Dimensions.get("window");
  const testURI = 'https://toptech.com/app-eula/';
  return (
    <React.Fragment>
      <StyledBox style={{ height: hp('100%'), paddingTop: 0, width: "100%", backgroundColor: 'white' }}>
        <Box >
          <Header
            headerText="LOAD2DAY® DRIVER CONNECT"
            // leftIcon="back"
            // onLeftPress={goBack}
            style={HEADER}
            titleStyle={HEADER_TITLE}
            subtitle="Terms and Conditions"
          />
          <Text style={TITLE}>Software End User License Agreement</Text>
          <ScrollView
            style={tcContainerScroll}
            onScroll={({ nativeEvent }) => {
              if (isCloseToBottom(nativeEvent)) {
                setState({
                  accepted: true
                })
              }
            }}
          >
            <View style={{ height: hp('60%') }}>
              <WebView style={{ height: height, width: width }}
                containerStyle={{ height: height, width: width }}
                source={{ uri: testURI }} />
            </View>
          </ScrollView>
          <TouchableOpacity disabled={!state.accepted} onPress={() => acceptTerms()} style={state.accepted ? button : buttonDisabled}><Text style={buttonLabel}>Accept</Text></TouchableOpacity>

          <TouchableOpacity disabled={!state.accepted} onPress={() => alertTerms()} style={state.accepted ? button2 : buttonDisabled2}><Text style={buttonLabel}>Decline</Text></TouchableOpacity>
        </Box>
      </StyledBox>

    </React.Fragment>
  );
}
export default TermsScreen;
