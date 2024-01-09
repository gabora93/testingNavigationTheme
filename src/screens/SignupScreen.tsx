import { Image, Icon, Input, InputField, styled, Pressable, VStack, ButtonSpinner, HStack, View, Text, KeyboardAvoidingView, ScrollView } from '@gluestack-ui/themed';
import { Globe, FileText, CheckCheck, Container } from 'lucide-react-native';
import { Header } from "../components/header/Header";
import { i18n } from '../i18n/i18n';
import { StyledBox, StyledButton, StyledButtonText, StyledText } from '../components/styledComponents/index';
import { PressableType } from '../types/types';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { FC, useState, useCallback, useEffect, useContext } from "react";
import Images from '../images/Images';
import { Dimensions, Platform } from 'react-native';
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


type FormValues = {
   firstName: string
   lastName: string
   license: string
   email: string
   cemail: string
   password: string
   cpassword: string
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

const SignupScreen = ({ navigation }) => {
   const { doSignUp, getUserToken2 } = AuthService();
   const { signIn } = React.useContext(AuthContext);
   const [username, setUsername] = useState('');
   const [type, setType] = useState('');
   const [password, setPassword] = useState('');
   const [status, setStatus] = useState('');
   const insets = useSafeAreaInsets();
   const WIDTH = Dimensions.get('screen').width
   const HEIGHT = Dimensions.get('screen').height
   const [isOpen, setIsOpen] = useState(false);
   const [refresh, setRefresh] = useState(false);

   const [showAlertDialog, setShowAlertDialog] = React.useState(false);
   const [alertText, setAlertText] = React.useState('');

   const [upperCase, setUpperCase] = useState(false);
   const [lowerCase, setLowerCase] = useState(false);
   const [lengthCase, setLengthCase] = useState(false);
   const [numberCase, setNumberCase] = useState(false);
   const [symbolCase, setSymbolCase] = useState(false);
   const [newPassword, setNewPassword] = useState('');
   const [buttonLoading, setButtonLoading] = React.useState(false);




   const { user, setUser } = useContext(AuthContext);

   const [state, setState] = React.useState(initialState);
   const emailInput = React.createRef();
   React.useEffect(() => {
      //emailInput.current.clear()
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
      console.log('newPassword', newPassword)
      setButtonLoading(true)
      if (data.email != data.cemail) {
         setButtonLoading(false)
         setAlertText("generalAlarms.alertEmailsDoNotMatch2")
         setType('')
         setShowAlertDialog(true)
         
       } else {
         console.log("matching emails");
         if (data.cpassword != newPassword) {
            setButtonLoading(false)
            setAlertText("generalAlarms.alertPasswordDoNotMach2")
            setType('')
            setShowAlertDialog(true)
         } else {
           console.log("matching passwords");
           setButtonLoading(false)             
           register(data);
         }
       }
   };

   const onCloseAlert = (type) => {
      console.log('closing alert')
      console.log('type:::', type)
      if (type === 'login_after_signup') {
         navigation.navigate("login_after_signup", {
            email: state.email,
            password: state.password,
          })
      } else {

      }
  }

  const passToken = (token, username) => {
   console.log("token passed in passToken signup", token);
   signIn(token, username);
 };

   const register = async (data) => {
      console.log('dataa', data);
      try {
         let body = {
            firstName: data.firstName,
            lastName: data.lastName,
            license: data.license,
            email: data.email,
            confirmEmail: data.cemail,
            password: newPassword,
            confirmPassword: data.cpassword,
            api_token: state.apiToken,
            os: Platform.OS,
            locale: i18n.locale
          };
          console.log('body en regsiter', body)
          const response = await doSignUp(body);
          console.log('RESPONSE;;;;;;;;   ', response.data)
          if (response.data.status === 0) {
            // 0 = success, 1 = error
            
            console.log("STATUS", response.data.result[0].Status);
            if (response.data.result[0].Status === "SUCCESS") {
              console.log("success");
              saveOnSecureStore("userEmail", state.email);
              passToken(state.apiToken, state.email);
              setAlertText("generalAlarms.alertCongratulations2")
              setShowAlertDialog(true)
              setType('login_after_signup')
            } else {
              console.log("dont succes");
              if (response.data.result[0].Status === "NO_MATCHING_RECORDS") {
                 setButtonLoading(false)
                 setAlertText("generalAlarms.alertDataNotMatch2")
                 setType('')
                 setShowAlertDialog(true)
              }
              if (response.data.result[0].Status === "USER_EXISTS") {
                setButtonLoading(false)
                 setAlertText("generalAlarms.alertUserAlreadyExist2")
                 setType('')
                 setShowAlertDialog(true)
              }
            }
          } else {
            console.log("errir");
            setButtonLoading(false)
            setAlertText("generalAlarms.somethingsWasWorng")
            setType('')
            setShowAlertDialog(true)
          }
        } catch (e) {
          setButtonLoading(false)
          setAlertText("generalAlarms.somethingsWasWorng")
          setType('')
          setShowAlertDialog(true)
        }
   }

   const handlePasswordValidation = (text) => {
      console.log(text);
      setNewPassword(text)
      if (text != '') {
         let _minEight = /(?=.{8,})/;
         let _upperCase = /(?=.*[A-Z])/;
         let _lowerCase = /(?=.*[a-z])/;
         let _number = /(?=.*[0-9])/;
         let _symbol = /(?=.*[@#$%^&+=.,*!¿¡?()_])/;

         if (text.match(_upperCase)) {
            setUpperCase(true)
            console.log("upper si");
         }
         else {
            setUpperCase(false)
            console.log("upper no");
         }

         if (text.match(_lowerCase)) {
            setLowerCase(true)
            console.log("lower si");
         }
         else {
            setLowerCase(false)
            console.log("lower no");
         }

         if (text.match(_symbol)) {
            setSymbolCase(true)
            console.log("symbol si");
         }
         else {
            setSymbolCase(false)
            console.log("symbol no");
         }
         if (text.match(_number)) {
            setNumberCase(true)
            console.log("number si");
         }
         else {
            setNumberCase(false)
            console.log("number no");
         }
         if (text.match(_minEight)) {
            setLengthCase(true)
            console.log("eight si");
         }
         else {
            setLengthCase(false)
            console.log("eight no");
         }
      }
      else {
         setUpperCase(false)
         setLowerCase(false)
         setSymbolCase(false)
         setLengthCase(false)
         setNumberCase(false)

      }
   }

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

   const handleAlertAppErrorEncounterOpen = () => {
      setState({ visibleError: true });
      // getUserToken();
   };
   const handleAlertAppErrorEncounterClose = () => {
      setState({ visibleError: false });
   };

   const goBack = () => navigation.navigate("login");


   return (
      <ScrollView
         nestedScrollEnabled
         keyboardDismissMode="on-drag"
         keyboardShouldPersistTaps="handled"
         contentInsetAdjustmentBehavior="automatic"
         contentContainerStyle={{ paddingBottom: 120 }}
         flex={1}
      >
         <KeyboardAvoidingView behavior="padding" flex={1} paddingTop={insets.top}>
            <StyledBox flex={1} bg='#1F4F7B' >
               <Header headerTx='signup.headerTitle' withBack={true} onLeftPress={goBack} />

               <VStack flex={1} $light-bg='$light100' px="$10" alignItems='center' space='xl'>

                  <Text color='red' >{status}</Text>


                  <FormProvider {...methods} >
                     <VStack w="$full" space='2xs'>
                        <TextInput
                           name="firstName"
                           isPassword={false}
                           label={i18n.t('signup.txtFirstName')}
                           placeholder={i18n.t('signup.txtFirstNamePh')}
                           keyboardType="default"
                           rules={{
                              required: i18n.t('signup.txtUserNamePh')
                           }}
                           setFormError={setError}
                        />
                        <TextInput
                           name="lastName"
                           isPassword={false}
                           keyboardType="default"
                           label={i18n.t('signup.txtLastName')}
                           placeholder={i18n.t('signup.txtLastNamePh')}
                           rules={{ required: i18n.t('generalAlarms.emptyFieldsFillMaxNumOfBols') }}
                           setFormError={setError}
                        />
                        <TextInput
                           name="license"
                           isPassword={false}
                           keyboardType="default"
                           label={i18n.t('signup.txtLicense')}
                           placeholder={i18n.t('signup.txtLicensePh')}
                           rules={{ required: i18n.t('generalAlarms.emptyFieldsFillMaxNumOfBols') }}
                           setFormError={setError}
                        />
                        <TextInput
                           name="email"
                           label={i18n.t('signup.txtEmail')}
                           placeholder={i18n.t('signup.txtEmailPh')}
                           keyboardType="email-address"
                           rules={{
                              required: i18n.t('signup.txtEmailPh'),
                              pattern: {
                                 value: /\b[\w\\.+-]+@[\w\\.-]+\.\w{2,4}\b/,
                                 message: i18n.t('generalAlarms.alertInvalidEmailFormat2'),
                              },
                           }}
                           setFormError={setError}
                        />
                        <TextInput
                           name="cemail"
                           label={i18n.t('signup.txtConfirmEmail')}
                           placeholder={i18n.t('signup.txtConfirmEmailPh')}
                           keyboardType="email-address"
                           rules={{
                              required: i18n.t('signup.txtEmailPh'),
                              pattern: {
                                 value: /\b[\w\\.+-]+@[\w\\.-]+\.\w{2,4}\b/,
                                 message: i18n.t('generalAlarms.alertInvalidEmailFormat2'),
                              },
                           }}
                           setFormError={setError}
                        />
                        <TextInput
                           name="password"
                           label={i18n.t('signup.txtPassword')}
                           isPassword={true}
                           placeholder={i18n.t('signup.txtPasswordPh')}
                           rules={{ }}
                           setFormError={setError}
                           onChangeText={(text => handlePasswordValidation(text))}
                        />
                          <VStack style={{marginTop: -10}}>
                          <Text style={{ color: lengthCase ? 'green' : 'red' }}>{upperCase ? i18n.t("signup.validationEightFine") : i18n.t("signup.validationEightWrong")}</Text>
                                <Text style={{ color: upperCase ? 'green' : 'red' }}>{upperCase ? i18n.t("signup.validationUpperFine") : i18n.t("signup.validationUpperWrong")}</Text>
                                <Text style={{ color: lowerCase ? 'green' : 'red' }}>{lowerCase ? i18n.t("signup.validationLowerFine") : i18n.t("signup.validationLowerWrong")}</Text>
                                <Text style={{ color: numberCase ? 'green' : 'red' }}>{numberCase ? i18n.t("signup.validationNumberFine") : i18n.t("signup.validationNumberWrong")}</Text>
                                <Text style={{ color: symbolCase ? 'green' : 'red' }}>{symbolCase ? i18n.t("signup.validationSymbolFine") : i18n.t("signup.validationSymbolWrong")}</Text>
                            </VStack>
                        <TextInput
                           name="cpassword"
                           label={i18n.t('signup.txtConfirmPassword')}
                           isPassword={true}
                           placeholder={i18n.t('signup.txtConfirmPasswordPh')}
                           rules={{ required: i18n.t('generalAlarms.emptyFieldsFillMaxNumOfBols') }}
                           setFormError={setError}
                        />
                     </VStack>
                  </FormProvider>
                  <StyledButton onPress={methods.handleSubmit(onSubmit, onError)} variant='solid' h="$12" w="$4/6" alignItems="center" justifyContent='center'>
            
                     {buttonLoading ?
                                <ButtonSpinner size="large" />
                                :
                                <StyledButtonText color='white'>{i18n.t('signup.btnRegister')}</StyledButtonText>
                            }         
                  </StyledButton>
               </VStack>
               <AlertComponent onClose={()=> onCloseAlert(type)} showAlertDialog={showAlertDialog} setShowAlertDialog={setShowAlertDialog} text={alertText} />
            </StyledBox>

         </KeyboardAvoidingView>
      </ScrollView>
   );
};


export default SignupScreen;