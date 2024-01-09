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
  firstname: string
  lastname: string
  license: string
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

const ForgotUserScreen = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [status, setStatus] = useState('');
  const insets = useSafeAreaInsets();
  const WIDTH = Dimensions.get('screen').width
  const HEIGHT = Dimensions.get('screen').height
  const [isOpen, setIsOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
    const { recoverUsername } = ProfileService();

  const [showAlertDialog, setShowAlertDialog] = React.useState(false);
  const [alertText, setAlertText] = React.useState('');


  const { doLogin, getUserToken2 } = AuthService();
  const { user, setUser } = useContext(AuthContext);

  const { signIn } = React.useContext(AC);
  const [state, setState] = React.useState(initialState);
  const emailInput = React.createRef();
  React.useEffect(() => {

    //emailInput.current.clear()
    console.log("LoginCredentialsScreen");
    if(user?.authToken){
      console.log('SI JWT TOKEN authToken')
    }else if(user?.temporalToken){
      console.log('SI TEMPORAL TOKEN');
    }else{
      console.log('NO JWT', user);
      
    }
    console.log("USER:::: ", user);

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
    getUsername(data);
  };

  const goToShowUserName = (username) => {
    setAlertText('showUsernameScreen.paraph1')
    setShowAlertDialog(true)
  }

  const onCloseAlert = () => {
    console.log('closing alert')
}

  const getUsername = async (data) => {
    try {
        let body = {
            firstName: data.firstname,
            lastName: data.lastname,
            license: data.license,
            locale: i18n.locale
        };
        console.log(i18n.locale);
        console.log('body', body);
        const response = await recoverUsername(body);
        console.log('response recoverUsername', response.data);
 

        if(response.data.result[0].Status === "SUCCESS"){
            const username = response.data.result[0].userID
            setUserName(username)
         setState({...state, userID: username})
            goToShowUserName(username)
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
                isPassword={false}
                name="firstname"
                label={i18n.t('forgotUsername.txtFirstName')}
                placeholder={i18n.t('forgotUsername.txtFirstNamePh')}
                keyboardType="default"
                rules={{
                  required: i18n.t('forgotUsername.txtFirstNamePh')
                }}
                setFormError={setError}
              />
              <TextInput
                name="lastname"
                label={i18n.t('forgotUsername.txtLastName')}
                placeholder={i18n.t('forgotUsername.txtLastNamePh')}
                keyboardType="default"
                rules={{
                  required: i18n.t('forgotUsername.txtLastNamePh')
                }}
                isPassword={false}
                setFormError={setError}
              />
              <TextInput
                name="license"
                label={i18n.t('forgotUsername.txtLicense')}
                placeholder={i18n.t('forgotUsername.txtLicensePh')}
                keyboardType="default"
                rules={{
                  required: i18n.t('forgotUsername.txtLicensePh')
                }}
                isPassword={false}
                setFormError={setError}
              />
            </VStack>
          </FormProvider>
          <StyledButton onPress={methods.handleSubmit(onSubmit, onError)} variant='solid' h="$12" w="$4/6" alignItems="center" justifyContent='center'>
            <StyledButtonText color='white'>{i18n.t('forgotUsername.btnGetUsername')}</StyledButtonText>
          </StyledButton>
        </VStack>
        <AlertComponent onClose={onCloseAlert} username={true} usernamerecovered={userName} showAlertDialog={showAlertDialog} setShowAlertDialog={setShowAlertDialog} text={alertText}/>
      </StyledBox>
        
    </KeyboardAvoidingView>
  );
};


export default ForgotUserScreen;