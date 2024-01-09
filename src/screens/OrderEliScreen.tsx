import React, { FC, useRef, useState, useEffect } from 'react';
import { StyledBox, StyledButton, StyledButtonText } from '../components/styledComponents/index';
import { Label } from "../components/components"
import { Header } from "../components/header/Header";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { VStack, ScrollView, KeyboardAvoidingView, Box, Icon, View, Input, InputField, ButtonSpinner } from '@gluestack-ui/themed';
import EligibilityService from '../services/axiosapi/EligibilityService';
import { getFromSecureStore } from '../services/helper';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { Platform, Dimensions, TextInput, TextStyle, TextInputProps } from 'react-native';
import { i18n } from '../i18n/i18n';
import { ChevronsDown, FileText, CheckCheck, Container } from 'lucide-react-native';
import AlertComponent from '../components/alert/Alert';


const initialState = {
    isLoading: false,
    supplierOptions: [],
    customerOptions: [],
    accountOptions: [],
    destinationOptions: [],
    trucksOptions: [],
    trailersOptions: [],
    selectedTerminal: {},
    selectedSupplier: {},
}

const inputs = ["terminal", "suppliers", "tractorTruck", "trailer1", "trailer2"]

export default function OrderElegibilityScreen({ navigation, route }) {
    const { terminals } = route.params;
    const { checkOrderEligibility, getSuppliersByTerminal, getVehiclesByTerminal } = EligibilityService();
    const [state, setState] = useState(initialState);
    const [selectedTerminal, setSelectedTerminal] = useState({});
    const [selectedSupplier, setSelectedSupplier] = useState({});
    const [selectedTractorTruck, setSelectedTractorTruck] = useState({});
    const [selectedTrailer1, setSelectedTrailer1] = useState({});
    const [selectedTrailer2, setSelectedTrailer2] = useState({});
    const [truckOptions, setTruckOptions] = useState([]);
    const [trailerOptions, setTrailerOptions] = useState([]);
    const [orderState, setOrderState] = useState("");
    const insets = useSafeAreaInsets();
    // Initializing didMount as false
    const [didMount, setDidMount] = useState(false)
    const [showAlertDialog, setShowAlertDialog] = React.useState(false);
    const [buttonLoading, setButtonLoading] = React.useState(false);
    const [alertText, setAlertText] = React.useState('');



    // Setting didMount to true upon mounting
    useEffect(() => { setDidMount(true) }, [])

    useEffect(() => {
        console.log('terminals from previous screen:', terminals);
    }, [])
    useEffect(() => {
        async function fetchData() {
            if (didMount) {
                await getSuppliers();
            }
        }
        fetchData();
    }, [selectedTerminal])

    const getSuppliers = async () => {
        const license = await getFromSecureStore("license");
        console.log('LICENSE', license);
        let terminal = selectedTerminal;
        try {
            let body = {
                license: license,
                term_id: terminal.id
            };
            await getSuppliersByTerminal(body).then((respo) => {
                if (respo.data.result[0].Status === "SUCCESS") {
                    const suppliers = Object.values(respo.data.result[0].Suppliers);
                    const supplierDropdownOptions = suppliers.map(supplier => {
                        //skip terminals that have no ID
                        if (!supplier.supplier_no) return null;
                        //combine id with name as requested.
                        const title = `${supplier.supplier_no} - ${supplier.supplier_name}`;
                        return { id: supplier.supplier_no, title }
                    }).filter(Boolean);
                    setState({ ...state, supplierOptions: supplierDropdownOptions })
                }
            }).then((res) => {
                getVehicles();
            })

        } catch (error) {
            console.log('error', error)
        }
    }

    const getVehicles = async () => {
        const license = await getFromSecureStore("license");
        console.log('LICENSE', license);
        let terminal = selectedTerminal;
        try {
            let body = {
                license: license,
                term_id: terminal.id
            };
            await getVehiclesByTerminal(body).then((response) => {
                if (response.data.result[0].Status === "SUCCESS") {
                    console.log("responseVehicles.data.result[0].Vehicles", response.data.result[0].Vehicles)
                    const dropDownArrayVehicles = Object.values(response.data.result[0].Vehicles).map(({ vehicle_id: title, veh_type: id, id: idToSend }) => ({ id, title, idToSend })).filter(function (x) {
                        return x.id !== undefined
                    });
                    const newDropDownVehiclesArray2 = Object.keys(dropDownArrayVehicles).forEach(key => {
                        console.log('key', dropDownArrayVehicles[key].title)
                        return dropDownArrayVehicles[key].key = `${dropDownArrayVehicles[key].title}`
                    });
                    const newDropDownVehiclesArray = Object.keys(dropDownArrayVehicles).forEach(key => {
                        console.log('key', dropDownArrayVehicles[key].title)
                        return dropDownArrayVehicles[key].title = `${dropDownArrayVehicles[key].id} - ${dropDownArrayVehicles[key].title}`
                    });
                    console.log(">>>>>>>>>>>>>>dropDownArrayVehicles>>>>>>>>>>>>>>>>>", dropDownArrayVehicles)

                    const tractorTruckArray = dropDownArrayVehicles;

                    const trailersArray = dropDownArrayVehicles;
                    setTruckOptions(tractorTruckArray);
                    setTrailerOptions(trailersArray);

                }
            })
        } catch (error) {
            console.log('error', error)
        }
    }

    const submit = () => {
        setButtonLoading(true)
        if (Object.keys(selectedTerminal).length === 0 || Object.keys(selectedSupplier).length === 0 || orderState === "") {
            setAlertText("generalAlarms.alertSomeFieldsEmpty")
            setShowAlertDialog(true)
        } else {
            console.log('checking')
            check();
        }
    }

    const check = async () => {
        console.log('Selected Terminal on state: ', selectedTerminal)
        console.log('Selected supplier on state: ', selectedSupplier)
        console.log('Selected TRACTOR TRUCK on state: ', selectedTractorTruck)
        console.log('Selected TRAILER 1 on state: ', selectedTrailer1)
        console.log('Selected TRAILER 2 on state: ', selectedTrailer2)
        console.log('Selected ORDER on state: ', orderState)
        let terminal = selectedTerminal;
        let supplier = selectedSupplier;
        let truck = selectedTractorTruck;
        let trailer1 = selectedTrailer1;
        let trailer2 = selectedTrailer2;
        try {
            const license = await getFromSecureStore("license");
            console.log("license", license);
            console.log(i18n.locale);
            let body = {
                license: license,
                term_id: terminal.id,
                supplier_no: supplier.id,
                truck_id: truck.id,
                trailer1_id: trailer1.id,
                trailer2_id: trailer2.id,
                order_no: orderState,
                locale: i18n.locale

            };
            console.log("BODY DE ELIGIBILITY: >>>>>>>>>>>>>>>>>>>", body)
            console.log(i18n.locale);
            const response = await checkOrderEligibility(body)
            console.log("response checkOrderEligibility", response)


            const eligibilityresults = response.data.result[0]
            setState({ ...state, buttonLoading: false })
            navigation.navigate('order_results', {
                eligibilityresults: eligibilityresults,
                license: license,
                term_id: terminal.id,
                supplier_no: supplier.id,
                truck_id: truck.id,
                truckLabel: truck,
                trailer1_id: trailer1.id,
                trailer1Label: trailer1,
                trailer2Label: trailer2,
                trailer2_id: trailer2.id,
                locale: i18n.locale
            });
            setButtonLoading(false);
        } catch (error) {
            console.log("ERROR checkOrderEligibility", error)
        }
    }
    const getLabel = (inputName) => {
        return `eligibilityLoad.${inputName}`;
    }
    const getPlaceHolder = (inputName) => {
        const placeholderName = `eligibilityLoad.${inputName}Ph`;
        return i18n.t(placeholderName);
    }

    const getDataSet = (inputName) => {
        switch (inputName) {
            case 'terminal': return terminals
            case 'suppliers': return state.supplierOptions
            case 'tractorTruck': return truckOptions
            case 'trailer1': return trailerOptions
            case 'trailer2': return trailerOptions
        }
    }

    const onSelectItem = (inputName, item) => {
        console.log('onSelectItem called with:', inputName, item);
        if (inputName === "terminal") {
            console.log('case terminal')
            setSelectedTerminal(item)
        } else if (inputName === "suppliers") {
            setSelectedSupplier(item)
        } else if (inputName === "tractorTruck") {
            setSelectedTractorTruck(item)
        } else if (inputName === "trailer1") {
            setSelectedTrailer1(item)
        } else if (inputName === "trailer2") {
            setSelectedTrailer2(item)
        }
    }

    const onCloseAlert = () => {
        setButtonLoading(false)
    }

    return (
        <StyledBox flex={1} paddingTop={insets.top} $light-bg='$light100' $dark-bg='$backgroundDark950'>
            <Header headerTx='eligibilityLoad.headerTitle' withBack={true} onLeftPress={() => navigation.goBack()} />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                enabled>
                <ScrollView
                    nestedScrollEnabled
                    keyboardDismissMode="on-drag"
                    keyboardShouldPersistTaps="handled"
                    contentInsetAdjustmentBehavior="automatic"
                    contentContainerStyle={{ paddingBottom: 120 }}
                    flex={1}
                >

                    <VStack alignItems='center' paddingTop="$12">
                        <Box w="$5/6" paddingVertical="$2">
                            <View>
                                <Label title={'orderEligibility.orderNum'} required={true} />
                                <Input
                                    borderColor='#E5F1FB'
                                    size="lg"
                                    isDisabled={false}
                                    isInvalid={false}
                                    isReadOnly={false}
                                    isRequired={true}
                                >
                                    <InputField fontSize={18} placeholderTextColor="gray" placeholder  backgroundColor="$primary0" placeholder={i18n.t('boList.typeYourOrder')} onChangeText={(text) => setOrderState(text)} value={orderState} />
                                </Input>
                            </View>
                            {inputs.map((data, index) => (
                                <Box paddingVertical="$2" key={index}>
                                    <Label title={getLabel(data)} required={true} />
                                    <AutocompleteDropdown
                                    
                                        clearOnFocus={false}
                                        direction={Platform.select({ ios: "down" })}
                                        inputHeight={50}
                                        emptyResultText={i18n.t('generalMessages.nothingFound')}
                                        onSelectItem={(item) => { item && onSelectItem(data, item) }}
                                        dataSet={getDataSet(data)}
                                        showChevron={true}
                                        inputContainerStyle={{ backgroundColor:'#E5F1FB' }}
                                        ChevronIconComponent={<Icon as={ChevronsDown} size={20} color="#fff" />}
                                        rightButtonsContainerStyle={{
                                            borderRadius: 25,
                                            right: 8,
                                            height: 30,
                                            top: 5,
                                            alignSelf: "center",
                                            backgroundColor: "#1F4F7B",
                                        }}
                                        containerStyle={{ width: "100%" }}
                                        closeOnBlur={true}
                                        closeOnSubmit={false}
                                        suggestionsListMaxHeight={Dimensions.get("window").height * 0.4}
                                        textInputProps={{
                                            placeholder: getPlaceHolder(data),
                                            placeholderTextColor: 'gray',
                                            style: { color: 'black'}
                                        }}

                                    /></Box>

                            ))}
                        </Box>
                        <StyledButton marginVertical="$8" sx={{ ":pressed": { backgroundColor: 'red', color: 'red' }, _dark: { borderColor: 'cyan', borderBottomColor: '$red900', borderBottomWidth: 5 }, _light: { variant: 'solid' } }} variant='outline' hardShadow="4"
                            onPress={() => submit()} alignItems="center" justifyContent='center' h="$12" w="$5/6" >
                            {buttonLoading ?
                                <ButtonSpinner size="large" />
                                :
                                <StyledButtonText sx={{ _dark: { color: 'white' }, _light: { color: '#1F4F7B' } }}>{i18n.t('eligibilityLoad.btnSave')}</StyledButtonText>
                            }
                        </StyledButton>
                    </VStack>
                </ScrollView>
            </KeyboardAvoidingView>
            <AlertComponent onClose={onCloseAlert} showAlertDialog={showAlertDialog} setShowAlertDialog={setShowAlertDialog} text={alertText} />
        </StyledBox>
    )
}



