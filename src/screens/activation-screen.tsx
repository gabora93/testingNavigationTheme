import React, { FC } from "react"
import { Image, Icon, Input, InputField, styled, Pressable, VStack, Center, HStack, View, Text, KeyboardAvoidingView, Box } from '@gluestack-ui/themed'
import { Alert, ImageStyle, TextStyle, ViewStyle, ScrollView, Platform } from "react-native"
import { Button, Screen } from "../components/components";
import { StyledBox, StyledButton, StyledButtonText, StyledText } from '../components/styledComponents/index';
import * as SecureStore from 'expo-secure-store';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { AuthContext } from '../context/AuthContext';
import { i18n } from '../i18n/i18n';
import { getFromSecureStore, saveOnSecureStore, deleteKeySecureStore } from "../services/helper";
import AuthService from "../services/axiosapi/AuthService";
import { Header } from "../components/header/Header";


const ROOT: ViewStyle = {
  backgroundColor: 'white',
  flex: 1,
  flexDirection: 'column',
  alignItems: 'center',
}
const CONTAINERSTYLE : ViewStyle = {
  position:"relative" ,backgroundColor: 'white', width: "100%", height: "auto"
}
const TITLE_STYLE: TextStyle = {
  color: 'black',
  lineHeight: 23,
  textAlign: "center",
  fontSize: 16,
  marginLeft: 2,
  marginRight: 2,
}

const TITLE_CONTAINER: ViewStyle = {
  flex: 1,
  alignItems: 'center',
  height: hp('100%'),
  top: hp(8)
}

const BUTTON_SIGNUP_STYLE: ViewStyle = {
  backgroundColor: "#1f4f7b",
  height: 50,
  width: 150,
  top: "20%"
}
const BUTTON_SIGNUP_STYLEIT: ViewStyle = {
  backgroundColor: "#1f4f7b",
  height: 50,
  width: 180,
  top: "20%"
}
const BUTTON_SIGNUP_STYLEDE: ViewStyle = {
  backgroundColor: "#1f4f7b",
  height: 50,
  width: 160,
  top: "20%"
}

const TEXT_BUTTON_STYLE: TextStyle = {
  fontSize: 16,
  fontWeight: "bold"
}

const HEADER: TextStyle = {
  paddingTop: 5,
  paddingBottom: 5,
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
  paddingTop: 2
}
const ActivationScreen = ({navigation}) => {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()
      const { isUserVerified } = AuthService();

    const { signOut } = React.useContext(AuthContext);
    const refresh = () => navigation.navigate("terms")
    const goBack = async () => {
      console.log("going back deleting securestore")
      deleteKeySecureStore("license")
      deleteKeySecureStore("firstName")
      deleteKeySecureStore("lastName")
      deleteKeySecureStore("userEmail")
      deleteKeySecureStore("jwt")
      deleteKeySecureStore("temporal_token")
      signOut();
      navigation.navigate("loginCredentials")
    }

    const checkEmailVerification = async () => {
      try{
      const email = await getFromSecureStore("userEmail");
      // const email = await getFromSecureStore("userEmail");
      let body = {
        userID: email
    };

      const response = await isUserVerified(body)
      console.log("response isUserVerified", response.data.result)
      if(response.data.result[0].Active === "0"){
        console.log("user not activated")
        Alert.alert(i18n.t('generalAlarms.accountNotActivated'), i18n.t('generalAlarms.accountNotActivated2'), [
          { text: "OK", onPress: () => console.log("ok pressed") }
        ]);
      }
      if(response.data.result[0].Active === "1"){
        Alert.alert(i18n.t('generalAlarms.accountActivated'), "", [
          { text: "OK", onPress: () => navigation.navigate("terms")}
        ]);
      }
    }catch(e){
      Alert.alert(e, i18n.t('generalAlarms.somethingsWasWorng'), [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]);
    }
    }

    // Pull in navigation via hook
    // const navigation = useNavigation()
    return (
      <React.Fragment>
        <StyledBox style={{ height: hp('100%'), paddingTop: 0, width: "100%", backgroundColor: 'white' }}>
          <Box >
            <Header
              headerTx="SignupScreen.headerTitle"
              leftIcon="back"
              onLeftPress={goBack}
              style={HEADER}
              titleStyle={HEADER_TITLE}
            />
            
            <View style={TITLE_CONTAINER}>
              <Text style={TITLE_STYLE} preset="header" tx="activationScreen.longTextHeader" />
              { i18n.locale ==  "it-IT" 
              ?
              <Button
                testID="next-screen-button"
                style={BUTTON_SIGNUP_STYLEIT}
                textStyle={TEXT_BUTTON_STYLE}
                tx="activationScreen.refreshButton"
                onPress={checkEmailVerification}
              />
              :
              i18n.locale == "de-DE" 
              ?
              <Button
                testID="next-screen-button"
                style={BUTTON_SIGNUP_STYLEDE}
                textStyle={TEXT_BUTTON_STYLE}
                tx="activationScreen.refreshButton"
                onPress={checkEmailVerification}
              />
              :
              i18n.locale == "es-US" 
              ?
              <Button
                testID="next-screen-button"
                style={BUTTON_SIGNUP_STYLEDE}
                textStyle={TEXT_BUTTON_STYLE}
                tx="activationScreen.refreshButton"
                onPress={checkEmailVerification}
              />
              :
              <Button
                testID="next-screen-button"
                style={BUTTON_SIGNUP_STYLE}
                textStyle={TEXT_BUTTON_STYLE}
                tx="activationScreen.refreshButton"
                onPress={checkEmailVerification}
              />
              }
            </View>

          </Box>
          </StyledBox>
      </React.Fragment>
    )
  }

  export default ActivationScreen;
