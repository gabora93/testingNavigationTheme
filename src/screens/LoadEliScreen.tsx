import React, { FC, useRef, useState, useEffect } from 'react';
import { StyledBox, StyledButton, StyledButtonText } from '../components/styledComponents/index';
import { Label } from "../components/components"
import { Header } from "../components/header/Header";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { VStack, ScrollView, KeyboardAvoidingView, Box, Icon, ButtonSpinner } from '@gluestack-ui/themed';
import EligibilityService from '../services/axiosapi/EligibilityService';
import { getFromSecureStore } from '../services/helper';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { Platform, Dimensions } from 'react-native';
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

const inputs = ["terminal", "suppliers", "customer", "account", "destination", "tractorTruck", "trailer1", "trailer2"]

export default function LoadElegibilityScreen({ navigation, route }) {
    const { terminals } = route.params;
    const { checkLoadRackEligibility, getSuppliersByTerminal, getCustomersBySupplier, getVehiclesByTerminal, getAccountsBySupplierCustomer, getAdestinationBySupplierCustomerAccount } = EligibilityService();
    const [state, setState] = useState(initialState);
    const [selectedTerminal, setSelectedTerminal] = useState({});
    const [selectedSupplier, setSelectedSupplier] = useState({});
    const [selectedCustomer, setSelectedCustomer] = useState({});
    const [selectedAccount, setSelectedAccount] = useState({});
    const [selectedDestination, setSelectedDestination] = useState({});
    const [selectedTractorTruck, setSelectedTractorTruck] = useState({});
    const [selectedTrailer1, setSelectedTrailer1] = useState({});
    const [selectedTrailer2, setSelectedTrailer2] = useState({});
    const insets = useSafeAreaInsets();
    const [truckOptions, setTruckOptions] = useState([]);
    const [trailerOptions, setTrailerOptions] = useState([]);
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
    useEffect(() => {
        if (didMount) getCustomers();
    }, [selectedSupplier])
    useEffect(() => {
        if (didMount) getAccounts();
    }, [selectedCustomer])
    useEffect(() => {
        if (didMount) getDestinations();
    }, [selectedAccount])
    // useEffect(() => {
    //     if (didMount) getVehicles();
    // }, [selectedDestination])

    const goGetVehicles = () => {
        getVehicles();
    }
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

    const getCustomers = async () => {
        const license = await getFromSecureStore("license");
        console.log('LICENSE', license);
        let terminal = selectedTerminal;
        let supplier = selectedSupplier;
        try {
            let body = {
                supplier_no: supplier.id,
                license: license,
                term_id: terminal.id
            };
            const response = await getCustomersBySupplier(body);
            if (response.data.result[0].Status === "SUCCESS") {
                const customers = Object.values(response.data.result[0].Customers);
                const customerDropdownOptions = customers.map(customer => {
                    //skip terminals that have no ID
                    if (!customer.cust_name) return null;
                    //combine id with name as requested.
                    const title = `${customer.cust_no} - ${customer.cust_name}`;
                    return { id: customer.cust_no, title }
                }).filter(Boolean);
                setState({ ...state, customerOptions: customerDropdownOptions })
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    const getAccounts = async () => {
        const license = await getFromSecureStore("license");
        console.log('LICENSE', license);
        let terminal = selectedTerminal;
        let supplier = selectedSupplier;
        let customer = selectedCustomer;
        try {
            let body = {
                supplier_no: supplier.id,
                cust_no: customer.id,
                license: license,
                term_id: terminal.id
            };
            const response = await getAccountsBySupplierCustomer(body);
            if (response.data.result[0].Status === "SUCCESS") {
                const accounts = Object.values(response.data.result[0].Accounts);
                const accountDropdownOptions = accounts.map(account => {
                    //skip terminals that have no ID
                    if (!account.acct_no) return null;
                    //combine id with name as requested.
                    const title = `${account.acct_no} - ${account.acct_name}`;
                    return { id: account.acct_name, title }
                }).filter(Boolean);
                setState({ ...state, accountOptions: accountDropdownOptions })
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    const getDestinations = async () => {
        const license = await getFromSecureStore("license");
        console.log('LICENSE', license);
        let terminal = selectedTerminal;
        let supplier = selectedSupplier;
        let customer = selectedCustomer;
        let account = selectedAccount;
        try {
            let body = {
                supplier_no: supplier.id,
                cust_no: customer.id,
                acct_no: account.id,
                license: license,
                term_id: terminal.id
            };
            const response = await getAdestinationBySupplierCustomerAccount(body)

            if (response.data.result[0].Status === "SUCCESS") {
                const destinations = Object.values(response.data.result[0].Destinations);
                console.log('destinations,   ', response.data.result[0])
                const destinationDropdownOptions = destinations.map(destination => {
                    //skip destinations that have no ID
                    console.log('destination', destination)
                    if (!destination.destination_no) return null;
                    //combine id with name as requested.
                    const title = `${destination.destination_no} - ${destination.destination_name}`;
                    return { id: destination.destination_name, title }
                }).filter(Boolean);
                console.log('destinationDropdownOptions 3', destinationDropdownOptions)
                setState({ ...state, destinationOptions: destinationDropdownOptions })
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    const submit = () => {
        setButtonLoading(true)
        if (Object.keys(selectedTerminal).length === 0 || Object.keys(selectedSupplier).length === 0
        || Object.keys(selectedCustomer).length === 0 || Object.keys(selectedAccount).length === 0 || 
        Object.keys(selectedDestination).length === 0 ) {
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
        console.log('Selected CUSTOMER on state: ', selectedCustomer)
        console.log('Selected ACCOUNT on state: ', selectedAccount)
        console.log('Selected DESTINATION on state: ', selectedDestination)
        console.log('Selected TRACTOR TRUCK on state: ', selectedTractorTruck)
        console.log('Selected TRAILER 1 on state: ', selectedTrailer1)
        console.log('Selected TRAILER 2 on state: ', selectedTrailer2)
        let terminal = selectedTerminal;
        let supplier = selectedSupplier;
        let customer = selectedCustomer;
        let account = selectedAccount;
        let destination = selectedDestination;
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
                cust_no: customer.id,
                acct_no: account.id,
                destination_no: destination.id,
                truck_id: truck.id,
                trailer1_id: trailer1.id,
                trailer2_id: trailer2.id,
                locale: i18n.locale

            };
            console.log("BODY DE ELIGIBILITY: >>>>>>>>>>>>>>>>>>>", body)
            console.log(i18n.locale);
            const response = await checkLoadRackEligibility(body)
            console.log("response checkOrderEligibility", response)


            const eligibilityresults = response.data.result[0]
            setState({ ...state, buttonLoading: false })
            navigation.navigate('load_results', {
                eligibilityresults: eligibilityresults,
                license: license,
                term_id: terminal.id,
                supplier_no: supplier.id,
                cust_no: customer.id,
                acct_no: account.id,
                destination_no: destination.id,
                truck_id: truck.id,
                trailer1_id: trailer1.id,
                trailer2_id: trailer2.id,
                truckLabel: truck,
                trailer1Label: trailer1,
                trailer2Label: trailer2,
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
            case 'customer': return state.customerOptions
            case 'account': return state.accountOptions
            case 'destination': return state.destinationOptions
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
        } else if (inputName === "customer") {
            setSelectedCustomer(item)
        } else if (inputName === "account") {
            setSelectedAccount(item)
        } else if (inputName === "destination") {
            setSelectedDestination(item)
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
                        {inputs.map((data, index) => (
                            <Box key={index} w="$5/6" paddingVertical="$2">
                                <Label title={getLabel(data)} required={true} />
                                <AutocompleteDropdown
                                    clearOnFocus={false}
                                    direction={Platform.select({ ios: "down" })}
                                    inputHeight={50}
                                    emptyResultText={i18n.t('generalMessages.nothingFound')}
                                    onSelectItem={(item) => { item && onSelectItem(data, item) }}
                                    dataSet={getDataSet(data)}
                                    showChevron={true}
                                    ChevronIconComponent={<Icon as={ChevronsDown} size={20} color="#fff" />}
                                    rightButtonsContainerStyle={{
                                        borderRadius: 25,
                                        right: 8,
                                        height: 30,
                                        top: 5,
                                        alignSelf: "center",
                                        backgroundColor: "#1F4F7B",
                                    }}
                                    containerStyle={{ width: "100%", }}
                                    closeOnBlur={true}
                                    closeOnSubmit={false}
                                    suggestionsListMaxHeight={Dimensions.get("window").height * 0.4}
                                    textInputProps={{
                                        placeholder: getPlaceHolder(data),
                                        placeholderTextColor: 'gray',
                                        style: { color: 'black' }
                                    }}
                                /></Box>
                        ))}

                        <StyledButton marginVertical="$8" sx={{ _dark: { borderColor: 'cyan', borderBottomColor: '$red900', borderBottomWidth: 5 }, _light: { variant: 'solid' } }} variant='outline' hardShadow="4"
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