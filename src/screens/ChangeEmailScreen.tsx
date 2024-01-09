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

import ProfileService from "../services/axiosapi/ProfileService";
import { getFromSecureStore, saveOnSecureStore, deleteKeySecureStore } from "../services/helper";
import { useForm, FormProvider, SubmitHandler, SubmitErrorHandler, Controller } from 'react-hook-form';
import { TextInput } from '../components/input/TextInput';
import { ModalComponent } from '../components/modal/ModalComponent';
import moment from "moment";
import AlertComponent from '../components/alert/Alert';


type FormValues = {
    newEmail: string
    confirmNewEmail: string
  }
  const initialState = {
    oldEmail: "",
    newEmail: "",
    confirmNewEmail: "",
    errors: {}
};


const ChangeEmailScreen = ({ navigation }) => {
    const { changeEmail } = ProfileService();

    const [status, setStatus] = useState('');
    const insets = useSafeAreaInsets();
    const [isOpen, setIsOpen] = useState(false);
    const [refresh, setRefresh] = useState(false);
  
    const [showAlertDialog, setShowAlertDialog] = React.useState(false);
    const [alertText, setAlertText] = React.useState('');
  

    const { user, setUser } = useContext(AuthContext);
  
    const { signIn } = React.useContext(AC);
    const [state, setState] = React.useState(initialState);
    const emailInput = React.createRef();
    useEffect(() => {
        getProfileInfo()
    }, []);

    const getProfileInfo = async () => {
        const email = await getFromSecureStore("userEmail");
        // const email = await getFromSecureStore("userEmail");
        setState({ ...state, oldEmail: email })

        console.log(email)
    }

    
    const handleEMailConfirmValidation = () => {
        if (state.newEmail == "" || state.confirmNewEmail == "") {
            Alert.alert(translate('generalAlarms.alertFieldsEmpty'), translate('generalAlarms.alertFieldsEmpty2'), [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]);
        }
        else{
          if (!validateEmail(state.confirmNewEmail)) {
  
            Alert.alert(translate('generalAlarms.alertInvalidEmailConfirmEmail'), translate('generalAlarms.alertInvalidEmailConfirmEmail2'), [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]);
          } else {
            setState({ ...state, errors: {} });
            if (state.newEmail != state.confirmNewEmail) {
                Alert.alert(translate('generalAlarms.alertEmailsDoNotMatch')
                , translate('generalAlarms.alertEmailsDoNotMatch2'), [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]);
            }
          }
        }    
      }

      const handleSubmit2 = async () => {
        console.log("handlesumbi2")
        if (state.newEmail == "" || state.confirmNewEmail == "") {
            Alert.alert(translate('generalAlarms.alertFieldsEmpty'), translate('generalAlarms.alertFieldsEmpty2'), [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]);
        } else {
            console.log("campos llenos")
            if (state.newEmail != state.confirmNewEmail) {
                Alert.alert(translate('generalAlarms.alertEmailsDoNotMatch')
                , translate('generalAlarms.alertEmailsDoNotMatch2'), [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]);
            } else {

                console.log("matching emails")
                const pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                const condition = new RegExp(pattern, 'g');
                const isValid = condition.test(state.newEmail.toUpperCase());
                console.log("isvalid", isValid)
                if (!validateEmail(state.newEmail)) {
                    Alert.alert(translate('generalAlarms.alertInvalidEmailFormat'), translate('generalAlarms.alertInvalidEmailFormat2'), [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]);
                } else {
                    if (!validateEmail(state.confirmNewEmail)) {
                        Alert.alert(translate('generalAlarms.alertInvalidEmailConfirmEmail'), translate('generalAlarms.alertInvalidEmailConfirmEmail2'), [
                            { text: "OK", onPress: () => console.log("OK Pressed") }
                        ]);
                    } else {
                        doChangeEmail()
                    }
                }
            }
        }
    }
  

    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        console.log("email", email)
        console.log("re.test(email)", re.test(email))
        return re.test(email);
    }

    const saveUserEmail = async (email) => {
        console.log("saving email:", email)
        saveOnSecureStore("userEmail", email);
    }

    
    const doChangeEmail = async (data) => {
        try {
            let body = {
                olduserID: state.oldEmail,
                newuserID: data.confirmNewEmail,
                locale:i18n.locale
            };
            console.log('body', body);
            const response = await changeEmail(body);
            console.log('response doChangeEmail', response.data);
            console.log('status', response.data.result[0].Status);

            if (response.data.result[0].Status === "SUCCESS") {
                saveUserEmail(state.newEmail)
                Alert.alert(translate('generalAlarms.alertSuccessEmailChanged'), translate('generalAlarms.alertSuccessEmailChanged2'), [
                    {
                        text: "OK", onPress: () => {
                            navigation.goBack()
                            onSelect()
                        }
                    }
                ]);

            } else {
                Alert.alert("", translate('generalAlarms.alertUserNotFound'), [
                    { text: "OK", onPress: () => { } }
                ]);
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
      doChangeEmail(data)
    //   DoLogin2(data);
    };
  


    return (
        <KeyboardAvoidingView behavior="padding" flex={1} paddingTop={insets.top}>
            <StyledBox flex={1} bg='#1F4F7B' >
                <Header headerTx='changeEmailUserName.headerTitle' withBack={true} onLeftPress={()=> navigation.goBack()}/>
                <VStack flex={1} $light-bg='$light100' px="$10" alignItems='center' space='xl'>
                    <Text color='red' >{status}</Text>
                    <StyledText paddingTop={3} fontSize={18} color='black'>{`${i18n.t('changeEmailUserName.emailUsername')} ${state.oldEmail}`}</StyledText>
                    <FormProvider {...methods} >
                        <VStack w="$full" space='2xs'>
                            <TextInput
                                name="newEmail"
                                label={i18n.t('changeEmailUserName.newEmail')}
                                placeholder={i18n.t('changeEmailUserName.placeholderemailUsername')}
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
                                name="confirmNewEmail"
                                label={i18n.t('changeEmailUserName.confirmEmail')}
                                placeholder={i18n.t('changeEmailUserName.placeholderconfirmEmail')}
                                rules={{ required: i18n.t('generalAlarms.emptyFieldsFillMaxNumOfBols') }}
                                setFormError={setError}
                            />
                        </VStack>
                    </FormProvider>
                    <StyledButton onPress={methods.handleSubmit(onSubmit, onError)} variant='solid' h="$12" w="$4/6" alignItems="center" justifyContent='center'>
                        <StyledButtonText color='white'>{i18n.t('changeEmailUserName.btnSave')}</StyledButtonText>
                    </StyledButton>
                    <ModalComponent setRefresh={setRefresh} state={refresh} isOpened={isOpen} handleOpen={handleOpen} handleClose={handleClose} setIsOpen={setIsOpen} />

                </VStack>
                <AlertComponent showAlertDialog={showAlertDialog} setShowAlertDialog={setShowAlertDialog} text={alertText} />
            </StyledBox>

        </KeyboardAvoidingView>
    )};

export default ChangeEmailScreen;