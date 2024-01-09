import React, { FC, useRef, useEffect, useState } from "react"
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyledBox, StyledText, StyledButton, StyledButtonText } from '../components/styledComponents/index';
import { Header } from "../components/header/Header";
import { Body, Form, View, VStack, HStack} from '@gluestack-ui/themed';
import ButtonGroup from '../components/buttons/ButtonGroup';
import { eligibilityButtons } from '../utilities/menuButtons';
import { Globe, FileText, CheckCheck, Container } from 'lucide-react-native';
import { i18n } from '../i18n/i18n';
import { getFromSecureStore } from '../services/helper';
import EligibilityService from '../services/axiosapi/EligibilityService';
// this is the screen of elegibility of the paid app (enterprise app)

const EligibilityPaidScreen = ({ navigation }) => {
    const { getTerminalsByLicence } = EligibilityService();
    const [terminalOptions, setTerminalOptions] = useState([]);


    useEffect(()=>{
        console.log('elipaid screen')
        getTerminals();
    },[])
    const insets = useSafeAreaInsets();
    const goToOrder = () => {
        console.log('go to order');
        // navigation.navigate('EligStack', { screen: 'order_elegilibility' })
        navigation.navigate('order_elegibility', {terminals: terminalOptions});
    }
    const gotoLoad = () => {
        console.log('go to load')
        navigation.navigate('load_elegibility', {terminals: terminalOptions});
    }
    const goBack = () => navigation.goBack()

    const getTerminals = async () => {
        const license = await getFromSecureStore("license");
        console.log('LICENSE', license)
        try {
            let body = {
                license: license
            };
            const response = await getTerminalsByLicence(body);
            console.log('response:::', response)
            if (response.data.result[0].Status === "SUCCESS") {
                const terminals = Object.values(response.data.result[0].Terminals);
                const terminalsDropdownOptions = terminals.map(terminal => {
                    //skip terminals that have no ID
                    if (!terminal.term_id) return null;
                    //combine id with name as requested.
                    const title = `${terminal.term_id} - ${terminal.name}`;
                    return { id: terminal.term_id, title }
                }).filter(Boolean);
                setTerminalOptions(terminalsDropdownOptions);
            }
        } catch (error) {
            console.log("error", error)
        }
    }

    return (
        <StyledBox flex={1} paddingTop={insets.top} bg='#1F4F7B' >
            <Header headerTx='eligibilityPaidScreen.headerTitle' /> 
            <HStack flex={1} $light-bg='$light100' $dark-bg='$backgroundDark950' alignContent='center' justifyContent='center'>
                <VStack alignContent='center' alignItems='center' justifyContent='center'>

                <StyledButton mb="$4" sx={{ _dark: { borderColor: 'cyan', borderBottomColor: '$red900', borderBottomWidth: 5 }, _light: { variant: 'solid' } }} variant='outline' hardShadow="4"
                    onPress={() => gotoLoad()} alignItems="center" justifyContent='center' h="$1/6" w="$5/6" paddingHorizontal="$4" >
                    <StyledButtonText textAlign='center' sx={{ _dark: { color: 'white' }, _light: { color: '#1F4F7B' } }}>{i18n.t("eligibilityPaidScreen.btnLoadRackEligibility")}</StyledButtonText>
                </StyledButton>
                <VStack justifyContent="center" alignItems="center" alignContent='center' w="$5/6"  mb="$1/6" marginHorizontal="$4">
                    <StyledText textAlign='justify' color="black">{i18n.t("eligibilityPaidScreen.descriptionLoadRackEligibility")}</StyledText>
                </VStack>
                <StyledButton mb="$4" sx={{ _dark: { borderColor: 'cyan', borderBottomColor: '$red900', borderBottomWidth: 5 }, _light: { variant: 'solid' } }} variant='outline' hardShadow="4"
                    onPress={() => goToOrder()} alignItems="center" justifyContent='center' h="$1/6" w="$5/6" >
                    <StyledButtonText textAlign='center' sx={{ _dark: { color: 'white' }, _light: { color: '#1F4F7B' } }}>{i18n.t("eligibilityPaidScreen.btnOrderElegibility")}</StyledButtonText>
                </StyledButton>
                <VStack justifyContent="center" alignItems="center" alignContent='center' w="$5/6"  mb="$1/6"  >
                    <StyledText textAlign='justify' color="black">{i18n.t("eligibilityPaidScreen.descriptionOrderElegibility")}</StyledText>
                </VStack>

                </VStack>
            </HStack>
        </StyledBox>


    )
}

export default EligibilityPaidScreen;