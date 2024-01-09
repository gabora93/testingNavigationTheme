import { Image, Icon, Input, InputField, styled, Pressable, VStack, Center, HStack, View, KeyboardAvoidingView, CloseCircleIcon } from '@gluestack-ui/themed';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyledBox, StyledText, StyledButton, StyledButtonText} from '../components/styledComponents/index';
import React, { FC, useState } from "react";
import { Header } from "../components/header/Header";
import { TextInput } from '../components/input/TextInput';
import { i18n } from "../i18n/i18n";
import { useForm, FormProvider, SubmitHandler, SubmitErrorHandler, Controller } from 'react-hook-form';
import { getFromSecureStore, saveOnSecureStore } from "../services/helper"
import { Alert } from 'react-native';


const initialState = {
    numberOfBols: "30",
    errors: {}
};

type FormValues = {
    numberOfBols: string
}

export default function SettingsScreen({ route, navigation }) {
    const insets = useSafeAreaInsets();
    const [formError, setError] = useState<Boolean>(false)

    const [state, setState] = React.useState(initialState);

    React.useEffect(() => {
        getNumberOfBOLsFromPhone()

    }, []);


    const { ...methods } = useForm({ mode: 'onChange' });
    const onError: SubmitErrorHandler<FormValues> = (errors, e) => {
        return console.log({ errors })
    }


    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log({ data })
        setState({ ...state, numberOfBols: data.numberOfBols });
        changeNumberOfBOLs()
    };



    const getNumberOfBOLsFromPhone = async () => {
        const numberOfBols = await getFromSecureStore("numBols");
        console.log(numberOfBols)
        setState({ ...state, numberOfBols: numberOfBols })
    }

    const changeNumberOfBOLs = async () => {
        saveOnSecureStore("numBols", state.numberOfBols);
    }
    const validateNumber = (number) => { return /^([1-9]|[1-9]\d+)$/.test(number) }
    const submitBols = () => {
        var isInt = Number.isInteger(state.numberOfBols)
        var number = validateNumber(state.numberOfBols)

        if (state.numberOfBols === "") {
            Alert.alert(i18n.t('generalAlarms.emptyFieldsFillMaxNumOfBols'), i18n.t('generalAlarms.emptyFieldsFillMaxNumOfBols2'), [
                { text: "OK", onPress: () => console.log("OK Pressed") }])
        } else {
            console.log("isInt", isInt)
            console.log("number", number)
            if (number) {
                changeNumberOfBOLs()
                Alert.alert(i18n.t('generalAlarms.maxNumOfBolsChanged'), "", [
                    { text: "OK", onPress: () => goBack() }])
            } else {
                Alert.alert(i18n.t('generalAlarms.numbersGreaterThanZero'), "", [
                    { text: "OK" }])
            }
        }
    }







    const goBack = () => {
        if (state.numberOfBols) {
            console.log("route.params.bolList", route.params.bolList)
            route.params.refreshList()
            navigation.goBack()
        } else {
            navigation.goBack()
        }
    }

    const enter = () => {
        methods.handleSubmit(onSubmit, onError)
        navigation.goBack();
    }


    return (
        <StyledBox flex={1} paddingTop={insets.top} bg='$light100' >
            <Header headerTx='bigMenu.settings' withBack={true} onLeftPress={() => navigation.goBack()} />

            <View alignItems='center' justifyContent='center' alignContent='center'  $light-bg='$light200' $dark-bg='$backgroundDark950' h="$full" >


                <View  alignItems='center' justifyContent='center' alignContent='center'>
                    <StyledText  sx={{ _dark: { color: 'white' }, _light: { color: '#1F4F7B' } }}>{i18n.t('settings.subtitle1')}</StyledText>
                    <StyledText  sx={{ _dark: { color: 'white' }, _light: { color: '#1F4F7B' } }}>{i18n.t('settings.subtitle2')}</StyledText>
                    <StyledText  sx={{ _dark: { color: 'white' }, _light: { color: '#1F4F7B' } }}>{i18n.t('settings.subtitle3')}</StyledText>
                </View>

                <View >
                    <FormProvider {...methods} >
                        <VStack w="$full" space='2xs'>
                            <TextInput
                                name="numberOfBols"
                                label={i18n.t('settings.labelNumberBols')}
                                keyboardType="email-address"
                                rules={{
                                    required: i18n.t('generalAlarms.emptyFieldsFillMaxNumOfBols2'),


                                }}
                                setFormError={setError}
                            />
                        </VStack>
                    </FormProvider>

              

                    <StyledButton h="$12" w="$34"  sx={{ _dark: { borderColor: 'cyan', borderBottomWidth: 5}, _light: { variant: 'solid' } }} variant='outline' hardShadow="4" 
                    onPress={() => enter()}  alignItems="center" justifyContent='center'  >
                            <StyledButtonText sx={{ _dark: { color: 'white' }, _light: { color: '#1F4F7B' } }}>{i18n.t('settings.btnSave')}</StyledButtonText>
                        </StyledButton>

                </View>

            </View>

        </StyledBox>
    )
};