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
import * as Localization from 'expo-localization';
import AuthService from "../services/axiosapi/AuthService";
import { getFromSecureStore, saveOnSecureStore, deleteKeySecureStore } from "../services/helper";
import { useForm, FormProvider, SubmitHandler, SubmitErrorHandler, Controller } from 'react-hook-form';
import { TextInput } from '../components/input/TextInput';
import { ModalComponent } from '../components/modal/ModalComponent';
import moment from "moment";
import AlertComponent from '../components/alert/Alert';


type FormValues = {
  userName: string
  password: string
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

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let [locale, setLocale] = useState(Localization.locale);
  const [status, setStatus] = useState('');
  const insets = useSafeAreaInsets();
  const WIDTH = Dimensions.get('screen').width
  const HEIGHT = Dimensions.get('screen').height
  const [isOpen, setIsOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

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
    getUserToken();

  }, []);

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    console.log("email", email);
    console.log("re.test(email)", re.test(email));
    return re.test(email);
  }

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const { ...methods } = useForm({ mode: 'onChange' });
  const [formError, setError] = useState<Boolean>(false)
  const onError: SubmitErrorHandler<FormValues> = (errors, e) => {
    return console.log({ errors })
  }


  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log({ data })
    setState({ ...state, buttonLoading: !state.buttonLoading });
    DoLogin2(data);
  };


  const handleMailValidation = () => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const condition = new RegExp(pattern, "g");
    const isValid = condition.test(state.email.toUpperCase());
    console.log("isvalid", isValid);
    if (!validateEmail(state.email)) {
      Alert.alert(
        translate("generalAlarms.useTheEmailYouRegistered"),
        translate("generalAlarms.useTheEmailYouRegistered2"),
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
      );
    } else {
      setState({ ...state, errors: {} });
    }
  };
  
  const getUserToken = async () => {
    deleteKeySecureStore("user");
    deleteKeySecureStore("temporal_token");
    const response = await getUserToken2();
    if (typeof response === 'string') {
      handleAlertAppErrorEncounterOpen();
      console.log('Error:   ', response);
    } else {
      console.log('good :', response.result.token);
      setUser({
        temporalToken: response.result.token,
        id: '',
        name: '',
        email: ''
      })
      
      saveTemporalToken(response.result.token);
      saveUser(JSON.stringify({
        temporalToken: response.result.token,
        id: '',
        name: '',
        email: ''
      }))
      setState({ ...state, apiToken: response.result.token });
    }
  };


  const saveUserEmail = async (email) => {
    console.log("saving email:", email);
    saveOnSecureStore("userEmail", email);
    //saveOnSecureStore("userEmail", email);
  };
  const saveToken = async (token) => {
    console.log("saving token:", token);
    console.log("typeOf token:", typeof token);
    saveOnSecureStore("jwt", token);
    //saveOnSecureStore("jwt", token);
  };
  const saveTemporalToken = async (tempToken) => {
    console.log("saving temporal_token:", tempToken);
    await saveOnSecureStore("temporal_token", tempToken);
    //saveOnSecureStore("temporal_token", tempToken);
  };

  const saveUser = async (user) => {
    console.log("saving USER:", user);
    await saveOnSecureStore("user", user);
    //saveOnSecureStore("temporal_token", tempToken);
  };


  const saveLicense = async (license) => {
    console.log("saving license:", license);
    saveOnSecureStore("license", license)
    //saveOnSecureStore("license", license);
  };
  const saveNames = async (firstName, lastName) => {
    console.log("saving names:", firstName);
    saveOnSecureStore("firstName", firstName)
    saveOnSecureStore("lastName", lastName)
    // saveOnSecureStore("firstName", firstName);
    // saveOnSecureStore("lastName", lastName);
  };

  const setDefaultBols = async () => {
    console.log("setDefaultBols:");
    const numberOfBols = await getFromSecureStore("numBols");
    if (numberOfBols) {
      console.log("numberOfBols alreadysetted");
    } else {
      console.log("numberOfBols null:", numberOfBols);
      saveOnSecureStore("numBols", "20");
    }
  };

  const passToken = (token, username) => {
    console.log("token", token, username);
    console.log('user in useAuth login:', username)
       // setUser();
    signIn(token, username);
  };

  const goToSignup = () => {
    navigation.navigate("signup_screen")
  };
  const goToForgotUsername = () => {
    navigation.navigate("forgot_user")
  };
  const goToForgotPassword = () => {
    navigation.navigate("forgot_password")
  };

  const DoLogin2 = async (data) => {
    console.log('data on login', data);
    const user = JSON.parse(await getFromSecureStore('user'));
    console.log('USSSSSSSSSSSSSSEEER:::: : :: ', user)
    
    try {
      let body = {
        userName: data.userName,
        password: data.password,
        api_token: user?.temporalToken
      };
      console.log("body", body);
      const response = await doLogin(body);
      console.log("response DoLogin2", response);
      console.log("status", response.data.result[0].Status);

      if (response.data.result[0].Status === "WRONG_USERNAME_PASSWORD") {
        setState({ ...state, buttonLoading: false });
        setAlertText("generalAlarms.wrongUsernameOrPassword")
        getUserToken()
        setShowAlertDialog(true)
      } else {
        saveUserEmail(response.data.result[0].email);
        saveLicense(response.data.result[0].license);
        saveNames(
          response.data.result[0].first_name,
          response.data.result[0].last_name
        );
        setDefaultBols();
        console.log("data.result[0]", response.data.result[0]);
        if (response.data.result[0].email_verified === "1") {
          if (response.data.result[0].t_c_accepted === "1") {
            console.log("terms accepted");
            passToken(
              response.data.result[0].original_token,
              response.data.result[0].email
            );
            saveToken(response.data.result[0].original_token);
            setUser({
              authToken: response.data.result[0].original_token,
              id: '',
              name: '',
              email: ''
            })
            setState({ ...state, email: "", password: "" });
          } else {
            console.log("terms not accepted");
            passToken(
              response.data.result[0].original_token,
              response.data.result[0].email
            );
            saveToken(response.data.result[0].original_token);
            setState({ ...state, email: "", password: "" });
            navigation.navigate("terms");
          }
        } else {
          passToken(
            response.data.result[0].original_token,
            response.data.result[0].email
          );
          saveToken(response.data.result[0].original_token);
          setState({ ...state, email: "", password: "" });
          navigation.navigate("activation");
        }
      }
    } catch (e) {
      console.log("e", e);
      console.log("e.msessage", e.message);
      setState({ ...state, buttonLoading: false });
      handleAlertAppErrorEncounterOpen();
      console.log(e);
    }
  };
  const settingLocale = (locale) => {
    console.log(locale);
    // navigation.dispatch(StackActions.replace('eligibility_menu'))
    setLocale(locale);
  }

  const handleTestAlerts = () => {
    setState({ visibleError: true });
  };
  
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
        <Header headerTx='loginScreen.headerTitle' />
        <VStack flex={1} $light-bg='$light100' px="$10" alignItems='center' space='xl'>
          <Image resizeMode='contain' w={WIDTH * .8} h="$1/6" source={Images.logo} alt='toptech logo' />
          <StyledText paddingTop={3} fontSize={25} color='black'>LOAD2DAY®</StyledText>
          <StyledText paddingTop={3} marginTop={-20} fontSize={25} color='black'>DRIVER CONNECT</StyledText>
          <Text color='red' >{status}</Text>
       

          <FormProvider {...methods} >
            <VStack w="$full" space='2xs'>
              <TextInput
                name="userName"
                label="Username"
                placeholder={i18n.t('loginScreen.txtUserNamePh')}
                keyboardType="email-address"
                rules={{
                  required: i18n.t('loginScreen.txtUserNamePh'),
                  pattern: {
                    value: /\b[\w\\.+-]+@[\w\\.-]+\.\w{2,4}\b/,
                    message: i18n.t('generalAlarms.alertInvalidEmailFormat2'),
                  },
                }}
                setFormError={setError}
              />
              <TextInput
                name="password"
                label="Password"
                isPassword={true}
                placeholder={i18n.t('loginScreen.txtPasswordPh')}
                rules={{ required: i18n.t('generalAlarms.emptyFieldsFillMaxNumOfBols') }}
                setFormError={setError}
              />
            </VStack>
          </FormProvider>
          <StyledButton onPress={methods.handleSubmit(onSubmit, onError)} variant='solid' h="$12" w="$4/6" alignItems="center" justifyContent='center'>
            <StyledButtonText color='white'>{i18n.t('loginCredentials.loginButton')}</StyledButtonText>
          </StyledButton>
          <StyledButton onPress={goToSignup} variant='outline' h="$12" w="$4/6" alignItems="center" justifyContent='center'>
            <StyledText numberOfLines={1}
              adjustsFontSizeToFit color='#1F4F7B'>{i18n.t('loginScreen.signUp')}</StyledText>
          </StyledButton>
          <HStack >
            <Pressable onPress={goToForgotUsername} variant='outline' h="$12" w="$4/6" alignItems="center" justifyContent='center'>
              <StyledText numberOfLines={1}
                adjustsFontSizeToFit color='#1F4F7B'>{i18n.t('loginScreen.forgotUsername')}</StyledText>
            </Pressable>
            <Pressable onPress={goToForgotPassword} variant='outline' h="$12" w="$4/6" alignItems="center" justifyContent='center'>
              <StyledText numberOfLines={1}
                adjustsFontSizeToFit color='$darkBlue500'>{i18n.t('loginScreen.forgotPassword')}</StyledText>
            </Pressable>
          </HStack>
          <StyledText color='#1F4F7B'>{VERSION}V</StyledText>

          <Pressable
            onPress={() => { setIsOpen(true) }}
          >
            <Icon as={Globe} size='xl' ></Icon>
          </Pressable>
          <ModalComponent setLocale={settingLocale} locale={locale} setRefresh={setRefresh} state={refresh} isOpened={isOpen} handleOpen={handleOpen} handleClose={handleClose} setIsOpen={setIsOpen} />
        
        </VStack>
        <AlertComponent onClose={()=>{console.log('')}} showAlertDialog={showAlertDialog} setShowAlertDialog={setShowAlertDialog} text={alertText}/>
      </StyledBox>
        
    </KeyboardAvoidingView>
  );
};


export default LoginScreen;