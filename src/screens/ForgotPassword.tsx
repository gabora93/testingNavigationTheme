import { Image, Icon, Input, InputField, styled, Pressable, VStack, Center, HStack, View, Text, KeyboardAvoidingView, CloseCircleIcon } from '@gluestack-ui/themed';
import { Globe, FileText, CheckCheck, Container } from 'lucide-react-native';
import { Header } from "../components/header/Header";
import { i18n } from '../i18n/i18n';
import { StyledBox, StyledButton, StyledButtonText, StyledText } from '../components/styledComponents/index';
import { PressableType } from '../types/types';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { FC, useState, useCallback, useEffect, useContext } from "react";
import Images from '../images/Images';
import { Dimensions } from 'react-native';
import { VERSION } from "../constants";
import { AuthContext } from '../context/AuthContext';
import { AuthContext as AC } from '../services/authContext';

import AuthService from "../services/axiosapi/AuthService";
import { getFromSecureStore, saveOnSecureStore, deleteKeySecureStore } from "../services/helper";
import { useForm, FormProvider, SubmitHandler, SubmitErrorHandler, Controller } from 'react-hook-form';
import { TextInput } from '../components/input/TextInput';
import { ModalComponent } from '../components/modal/ModalComponent';
import moment from "moment";
import AlertComponent from '../components/alert/Alert';
import ProfileService from "../services/axiosapi/ProfileService";


type FormValues = {
  email: string
}
const initialState = {
  email: "",
  password: "",
  showPassword: true,
  buttonLoading: false,
  apiToken: "",
  errors: {},
  visible: false,
};

const ForgotPasswordScreen = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [passwordText, setPasswordText] = useState('');
  const [passwordText2, setPasswordText2] = useState('');
  const [status, setStatus] = useState('');
  const insets = useSafeAreaInsets();
  const WIDTH = Dimensions.get('screen').width
  const HEIGHT = Dimensions.get('screen').height
  const [isOpen, setIsOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
    const { recoverPassword } = ProfileService();

  const [showAlertDialog, setShowAlertDialog] = React.useState(false);
  const [alertText, setAlertText] = React.useState('');


  const { doLogin, getUserToken2 } = AuthService();
  const { user, setUser } = useContext(AuthContext);

  const { signIn } = React.useContext(AC);
  const [state, setState] = React.useState(initialState);
  const emailInput = React.createRef();
  React.useEffect(() => {

    

  }, []);

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    console.log("email", email);
    console.log("re.test(email)", re.test(email));
    return re.test(email);
  }

  const { ...methods } = useForm({ mode: 'onChange' });
  const [formError, setError] = useState<Boolean>(false)
  const onError: SubmitErrorHandler<FormValues> = (errors, e) => {
    return console.log({ errors })
  }

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log({ data })
    setState({ ...state, buttonLoading: !state.buttonLoading });
    getPassword(data);
  };

  const goToShowPassword = (username) => {
    setPasswordText('showPasswordScreen.paraph2')
    setPasswordText2('showPasswordScreen.paraph3')
    setAlertText('showPasswordScreen.paraph1')
    setShowAlertDialog(true)
  }

  const onCloseAlert = () => {
    console.log('closing alert')
}

  const getPassword = async (data) => {
    try {
      let body = {
          userID: data.email,
          api_token: "IntcInR5cFwiOlwiSldUXCIsXCJhbGdcIjpcIkhTMjU2XCJ9Ig.eyJDb21wYW55IjoiU29ub3JhIC0gQXBwIERldmVsb3BtZW50IENvbXBhbnkiLCJUb3B0ZWNoUHJvZHVjdCI6IkwyRCIsIkNyZWF0aW9uRGF0ZSI6IjIwMjEtMDktMjggMTE6MDA6NDgifQ.1EezgPf2v79q45ejwfCwb8nzNln1TN9vIectudIMn8k",
          locale: i18n.locale
      };
      console.log('locale: ', i18n.locale);
      console.log('body', body);
      const response = await recoverPassword(body);
      console.log('response getPassword', response.data);


      if(response.data.result[0].Status === "SUCCESS"){
        console.log('SUCEESSSSSSSS')
        
    //   setState({...state, userID: username})
         goToShowPassword()
        }else{
          setAlertText("generalAlarms.alertUserNotFound")
          setShowAlertDialog(true)
        }

    

    } catch (e) {
        console.log('e', e);
        handleAlertAppErrorEncounterOpen();
        console.log(e);
         /*Alert.alert(translate('generalAlarms.alertAppEncounteredError'), translate('generalAlarms.alertAppEncounteredError2'), [
            { text: "OK", onPress: () => console.log(e) }
        ]);*/
    }
}

  const handleAlertAppErrorEncounterOpen = () => {
    setState({ visibleError: true });
    // getUserToken();
  };
  const handleAlertAppErrorEncounterClose = () => {
    setState({ visibleError: false });
  };

  const goBack = () => navigation.navigate("login");


  return (
    <KeyboardAvoidingView behavior="padding" flex={1} paddingTop={insets.top}>
      <StyledBox flex={1} bg='#1F4F7B' >
        <Header headerTx='forgotUsername.headerTitle' withBack={true} onLeftPress={() => navigation.goBack()} />
        <VStack flex={1} $light-bg='$light100' px="$10" alignItems='center' space='xl'>
          <Image resizeMode='contain' w={WIDTH * .8} h="$1/6" source={Images.logo} alt='toptech logo' />
          <StyledText paddingTop={3} fontSize={25} color='black'>LOAD2DAY®</StyledText>
          <StyledText paddingTop={3} marginTop={-20} fontSize={25} color='black'>DRIVER CONNECT</StyledText>
          <Text color='red' >{status}</Text>
       

          <FormProvider {...methods} >
            <VStack w="$full" space='2xs'>
            <TextInput
                name="email"
                label={i18n.t('forgotPassword.txtEmailUsername')}
                placeholder={i18n.t('forgotPassword.txtEmailUsernamePh')}
                keyboardType="email-address"
                rules={{
                  required: i18n.t('forgotPassword.txtEmailUsernamePh'),
                  pattern: {
                    value: /\b[\w\\.+-]+@[\w\\.-]+\.\w{2,4}\b/,
                    message: i18n.t('generalAlarms.alertInvalidEmailFormat2'),
                  },
                }}
                setFormError={setError}
              />
            </VStack>
          </FormProvider>
          <StyledButton onPress={methods.handleSubmit(onSubmit, onError)} variant='solid' h="$12" w="$4/6" alignItems="center" justifyContent='center'>
            <StyledButtonText color='white'>{i18n.t('forgotPassword.btnGetPassword')}</StyledButtonText>
          </StyledButton>
        </VStack>
        <AlertComponent onClose={onCloseAlert} password={true} passwordText={passwordText} passwordText2={passwordText2} showAlertDialog={showAlertDialog} setShowAlertDialog={setShowAlertDialog} text={alertText}/>
      </StyledBox>
        
    </KeyboardAvoidingView>
  );
};


export default ForgotPasswordScreen;