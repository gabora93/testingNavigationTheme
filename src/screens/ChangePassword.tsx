import { Image, Icon, Input, InputField, styled, Pressable, VStack, Center, HStack, View, KeyboardAvoidingView, CloseCircleIcon } from '@gluestack-ui/themed';
import { Globe, FileText, CheckCheck, Container } from 'lucide-react-native';
import { Header } from "../components/header/Header";
import { i18n } from '../i18n/i18n';
import { StyledBox, StyledButton, StyledButtonText, StyledText } from '../components/styledComponents/index';
import { PressableType } from '../types/types';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { FC, useState, useCallback, useEffect, useContext } from "react";
import Images from '../images/Images';
import { Dimensions, TextStyle } from 'react-native';
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
import { Text } from '../components/components'

type FormValues = {
    currentPassword: string
    newPassword: string
    confirmNewPassword: string
}

const initialState = {
    currentPassword: "",
    userID: "",
    newPassword: "",
    confirmPassword: "",
    errors: {}
};

const INPUT_PASSWORD_SUBTITLES_STYLE_WRONG: TextStyle = {
    color: "red",
    paddingLeft: 0,
    fontSize: 12,
};
const INPUT_PASSWORD_SUBTITLES_STYLE_FINE: TextStyle = {
    color: "green",
    paddingLeft: 0,
    fontSize: 12,
};


const ChangePasswordScreen = ({ navigation }) => {
    const { changePassword } = ProfileService();
    const [status, setStatus] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const insets = useSafeAreaInsets();
    const [isOpen, setIsOpen] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const [showAlertDialog, setShowAlertDialog] = React.useState(false);
    const [alertText, setAlertText] = React.useState('');

    const [upperCase, setUpperCase] = useState(false);
    const [lowerCase, setLowerCase] = useState(false);
    const [lengthCase, setLengthCase] = useState(false);
    const [numberCase, setNumberCase] = useState(false);
    const [symbolCase, setSymbolCase] = useState(false);

    const [success, setSuccess] = useState(false);



    const [state, setState] = React.useState(initialState);
    const emailInput = React.createRef();
    useEffect(() => {
        getProfileInfo()
    }, []);

    const getProfileInfo = async () => {
        const email = await getFromSecureStore("userEmail");
        // const email = await getFromSecureStore("userEmail");
        setState({ ...state, userID: email })

        console.log(email)
    }
    const onCloseAlert = () => {
        console.log('closing alert')
        console.log('success:::', success)
        if (success) {
            navigation.goBack();
        } else {

        }
    }


    const doChangePassword = async (data) => {
        try {
            let body = {
                userID: state.userID,
                oldpassword: data.currentPassword,
                newpassword: newPassword,
                locale: i18n.locale
            };
            console.log('body', body);
            const response = await changePassword(body);
            console.log('response doChangePassword', response.data);
            console.log('status', response.data.result[0].Status);

            if (response.data.result[0].Status === "SUCCESS") {
                setSuccess(true);
                setAlertText("generalAlarms.alertSuccessNotiTokenUdt")
                setShowAlertDialog(true)
            }

            if (response.data.result[0].Status === "USER_NOT_FOUND") {
                setAlertText("generalAlarms.alertUserNotFound")
                setShowAlertDialog(true)
            }

            if (response.data.result[0].Status === "WRONG_PASSWORD") {
                setAlertText("generalAlarms.wrongCurrentPassword")
                setShowAlertDialog(true)
            }
        } catch (e) {
            console.log('e', e);
            setAlertText("generalAlarms.alertAppEncounteredError")
            setShowAlertDialog(true)
            console.log(e);
        }
    }

    const { ...methods } = useForm({ mode: 'onChange' });
    const [formError, setError] = useState<Boolean>(false)
    const onError: SubmitErrorHandler<FormValues> = (errors, e) => {
        return console.log({ errors })
    }

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log('SATE', newPassword)
        console.log('data: ', { data })
        if (newPassword != data.confirmNewPassword) {
            setAlertText("generalAlarms.alertPasswordDoNotMach2")
            setShowAlertDialog(true)
        } else {
            doChangePassword(data)
        }

    };

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
    };

    return (
        <KeyboardAvoidingView behavior="padding" flex={1} paddingTop={insets.top}>
            <StyledBox flex={1} bg='#1F4F7B' >
                <Header headerTx='changePassword.headerTitle' withBack={true} onLeftPress={() => navigation.goBack()} />
                <VStack flex={1} $light-bg='$light100' px="$10" alignItems='center' space='xl'>

                    <Text color='red' >{status}</Text>
                    <FormProvider {...methods} >
                        <VStack w="$full" space='2xs'>
                            <TextInput
                                isPassword={true}
                                name="currentPassword"
                                label={i18n.t('changePassword.currentPass')}
                                placeholder={i18n.t('changePassword.placeholderCurrentPass')}
                                rules={{
                                    required: i18n.t('generalAlarms.emptyFieldsFillMaxNumOfBols')
                                }}
                                setFormError={setError}
                            />
                            <TextInput
                                name="newPassword"
                                isPassword={true}
                                label={i18n.t('changePassword.newPass')}
                                placeholder={i18n.t('changePassword.newPass')}
                                rules={{
                                }}
                                onChangeText={(text => handlePasswordValidation(text))}
                                setFormError={setError}
                            />
                            <View style={{ marginBottom: 20, paddingLeft: 15 }}>
                                <Text style={{ color: lengthCase ? 'green' : 'red' }}>{upperCase ? i18n.t("signup.validationEightFine") : i18n.t("signup.validationEightWrong")}</Text>
                                <Text style={{ color: upperCase ? 'green' : 'red' }}>{upperCase ? i18n.t("signup.validationUpperFine") : i18n.t("signup.validationUpperWrong")}</Text>
                                <Text style={{ color: lowerCase ? 'green' : 'red' }}>{lowerCase ? i18n.t("signup.validationLowerFine") : i18n.t("signup.validationLowerWrong")}</Text>
                                <Text style={{ color: numberCase ? 'green' : 'red' }}>{numberCase ? i18n.t("signup.validationNumberFine") : i18n.t("signup.validationNumberWrong")}</Text>
                                <Text style={{ color: symbolCase ? 'green' : 'red' }}>{symbolCase ? i18n.t("signup.validationSymbolFine") : i18n.t("signup.validationSymbolWrong")}</Text>
                            </View>

                            <TextInput
                                isPassword={true}
                                name="confirmNewPassword"
                                label={i18n.t('changePassword.confirmPass')}
                                placeholder={i18n.t('changePassword.confirmPass')}
                                rules={{ required: i18n.t('generalAlarms.emptyFieldsFillMaxNumOfBols') }}
                                setFormError={setError}
                            />
                        </VStack>
                    </FormProvider>

                    <StyledButton onPress={methods.handleSubmit(onSubmit, onError)} variant='solid' h="$12" w="$4/6" alignItems="center" justifyContent='center'>
                        <StyledButtonText color='white'>{i18n.t('changePassword.btnSave')}</StyledButtonText>
                    </StyledButton>
                </VStack>
                <AlertComponent onClose={onCloseAlert} showAlertDialog={showAlertDialog} setShowAlertDialog={setShowAlertDialog} text={alertText} />
            </StyledBox>

        </KeyboardAvoidingView>
    )
};

export default ChangePasswordScreen;