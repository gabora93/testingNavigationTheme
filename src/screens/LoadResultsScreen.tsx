import React, { FC, useRef } from "react"
import { TextStyle, ViewStyle, View, ImageStyle, ScrollView } from "react-native"
import { Screen, Button, AutoImage as Image, Text } from "../components/components";
import { Header } from "../components/header/Header";
import { color, spacing } from "../theme"
import { Body, Form, Box } from '@gluestack-ui/themed';
import * as SecureStore from 'expo-secure-store';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { isIphoneX, getStatusBarHeight } from 'react-native-iphone-x-helper';
 
 
import { DefaultTheme, DataTable, List } from 'react-native-paper';
import { translate } from "../i18n/i18n";


const TITLE_CONTAINER: ViewStyle = {
    flex: 1,
    alignItems: 'center',
    top: hp(2),
}
const CONTAINER: ViewStyle = {
    borderColor: 'green',
    borderWidth: 1,
    borderStyle: 'solid',
}

const EMPTY: ViewStyle = {

}

const BUTTON_LOGIN_STYLE: ViewStyle = {
    backgroundColor: "#1f4f7b",
    height: hp(8),
    width: wp('80%'),
    top: "30%",
    marginBottom: hp(1),
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOpacity: 9.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
}

const BUTTON_SIGNUP_STYLE: ViewStyle = {
    backgroundColor: "#1f4f7b",
    height: hp(8),
    width: wp('80%'),
    top: "20%",

    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOpacity: 9.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
}
const BUTTON_LOGOUT: ViewStyle = {
    backgroundColor: "#1f4f7b",
    height: 50,
    width: 150,
    top: "50%"
}
const PRODUCTS_CONTAINER: ViewStyle = {
    flex: 1,
    flexDirection: 'column',
    justifyContent: "center",
    borderColor: 'green',
    borderWidth: 1,
    borderStyle: 'solid',
    marginHorizontal: spacing[2],
}
const ERROR_CONTAINER: ViewStyle = {
    flex: 1,
    flexDirection: 'column',
    justifyContent: "center",
    borderColor: 'red',
    borderWidth: 1,
    borderStyle: 'solid',
    marginHorizontal: spacing[2]
}
const HEADER: TextStyle = {
    paddingTop: spacing[5],
    paddingBottom: spacing[4] - 1,
    paddingHorizontal: 0,
    backgroundColor: "#1f4f7b",
}
const BOLD: TextStyle = { fontWeight: "bold" }
const HEADER_TITLE: TextStyle = {
    ...BOLD,
    fontSize: 18,
    lineHeight: 15,
    textAlign: "center",
    letterSpacing: 1.5,
    paddingTop: spacing[1],
    paddingLeft: spacing[5]
}
const TEXT_BUTTON_STYLE: TextStyle = {
    fontSize: 16,
    fontWeight: "bold"
}

const LOGO: ImageStyle = {
    height: 50,
    width: 200,
    alignSelf: "flex-start",
    marginLeft: spacing[2],
    marginTop: spacing[2]
}
const TITLE_STYLE: TextStyle = {
    color: color.palette.black,
    lineHeight: 23,


}
const TITLE_STYLE2: TextStyle = {
    color: color.palette.black,
    lineHeight: 23,
    ...BOLD,
    textAlign: 'center'


}
const TITLE_ERROR: TextStyle = {
    color: color.palette.black,
    lineHeight: 20,
    ...BOLD,
    textAlign: 'left'


}

const ERROR_TEXT: TextStyle = {
    color: 'red',
    lineHeight: 20,
    ...BOLD,
    textAlign: 'left',
    paddingLeft: spacing[2]


}

const PASSED_TEXT: TextStyle = {
    color: 'green',
    lineHeight: 20,
    ...BOLD,
    textAlign: 'left',
    paddingLeft: spacing[2]


}

const initialState = {
    eligibilityresults: [],
    products: [],
    customerErrors: [],
    supplierErrors: [],
    trailer1Errors: [],
    trailer2Errors: [],
    accountErrors: [],
    carrierErrors: [],
    destinationErrors: [],
    driverErrors: [],
    terminalErrors: [],
    truckErrors: [],
    vsxErrors: [],
    passed: [],
    scroll: false,
    driverErrorsOpened: false,
    customerErrorsOpened: false,
    supplierErrorsOpened: false,
    truckErrorsOpened: false,
    trailer1ErrorsOpened: false,
    trailer2ErrorsOpened: false,
    accountErrorsOpened: false,
    terminalErrorsOpened: false,
    carrierErrorsOpened: false,
    vsxErrorsOpened: false,
    destinationErrorsOpened: false,
    orderErrorsOpened: false,
    passedOnesOpened: false,
};

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'tomato',
        accent: 'yellow',
    },
};


export default function LoadResultsScreen({ navigation, route }){
        // Pull in one of our MST stores
        // const { someStore, anotherStore } = useStores()
        const { eligibilityresults, license, term_id, supplier_no, cust_no, acct_no, destination_no, truck_id, trailer1_id, trailer2_id, truckLabel, trailer1Label, trailer2Label } = route.params;
        console.log("LOAD RESULTS")
        console.log("license license", license)
        const goToOrder = () => navigation.navigate("order_elegibility")
        const gotoLoad = () => navigation.navigate("load_elegibility")
        const [state, setState] = React.useState(initialState);
        const scrollViewRef = useRef();
        React.useEffect(() => {
            console.log("LoadResultsScreen")
            var customerErrors = []
            var supplierErrors = []
            var truckErrors = []
            var trailer1Errors = []
            var trailer2Errors = []
            var accountErrors = []
            var terminalErrors = []
            var carrierErrors = []
            var driverErrors = []
            var vsxErrors = []
            var destinationErrors = []
            var passed = []

            const products = Object.values(eligibilityresults.Products).filter(function (x) {
                return x.prod_name !== undefined
            });

            if (eligibilityresults.Customer_Status === 0) {
                customerErrors = Object.values(eligibilityresults.CustomerErrors).filter(function (x) {
                    return x.error !== undefined
                });
                console.log("customer errors: ", customerErrors)
            }
            else {
                console.log("eligibilityresults.Customer_Status", eligibilityresults.Customer_Status)
                passed.push(translate('orderEligibilityResults.customerData'))

            }

            if (eligibilityresults.Supplier_Status === 0) {
                supplierErrors = Object.values(eligibilityresults.SupplierErrors).filter(function (x) {
                    return x.error !== undefined
                });
                console.log("supplierErrors errors: ", supplierErrors)
            }
            else {
                console.log("eligibilityresults.Supplier_Status", eligibilityresults.Supplier_Status)
                passed.push(translate('orderEligibilityResults.supplierData'))
            }

            if (eligibilityresults.Account_Status === 0) {
                accountErrors = Object.values(eligibilityresults.AccountErrors).filter(function (x) {
                    return x.error !== undefined
                });
                console.log("accountErrors errors: ", accountErrors)
            }
            else {
                console.log("eligibilityresults.Account_Status", eligibilityresults.Account_Status)
                passed.push(translate('orderEligibilityResults.accountData'))
            }

            if (eligibilityresults.Trailer1_Status === 0) {
                trailer1Errors = Object.values(eligibilityresults.Trailer1Errors).filter(function (x) {
                    return x.error !== undefined
                });
            }
            else {
                console.log("eligibilityresults.Trailer1_Status", eligibilityresults.Trailer1_Status)
                passed.push(translate('orderEligibilityResults.trailer1Data'))
            }

            if (eligibilityresults.Trailer2_Status === 0) {
                trailer2Errors = Object.values(eligibilityresults.Trailer2Errors).filter(function (x) {
                    return x.error !== undefined
                });
            }
            else {
                console.log("eligibilityresults.Trailer2_Status", eligibilityresults.Trailer2_Status)
                passed.push(translate('orderEligibilityResults.trailer2Data'))
            }

            if (eligibilityresults.Terminal_Status === 0) {
                terminalErrors = Object.values(eligibilityresults.TerminalErrors).filter(function (x) {
                    return x.error !== undefined
                });
            }
            else {
                console.log("eligibilityresults.Terminal_Status", eligibilityresults.Terminal_Status)
            }

            if (eligibilityresults.Truck_Status === 0) {
                truckErrors = Object.values(eligibilityresults.TruckErrors).filter(function (x) {
                    return x.error !== undefined
                });
            }
            else {
                console.log("eligibilityresults.Truck_Status", eligibilityresults.Truck_Status)
                passed.push(translate('orderEligibilityResults.truckData'))
            }
            if (eligibilityresults.Carrier_Status === 0) {
                carrierErrors = Object.values(eligibilityresults.CarrierErrors).filter(function (x) {
                    return x.error !== undefined
                });
            }
            else {
                console.log("eligibilityresults.Carrier_Status", eligibilityresults.Carrier_Status)
                passed.push(translate('orderEligibilityResults.carrierData'))
            }
            if (eligibilityresults.Driver_Status === 0) {
                driverErrors = Object.values(eligibilityresults.DriverErrors).filter(function (x) {
                    return x.error !== undefined
                });
            }
            else {
                console.log("eligibilityresults.Driver_Status", eligibilityresults.Driver_Status)
                passed.push(translate('orderEligibilityResults.driverData'))
            }
            if (eligibilityresults.VSX_Status === 0) {
                vsxErrors = Object.values(eligibilityresults.VSXErrors).filter(function (x) {
                    return x.error !== undefined
                });
            }
            else {
                console.log("eligibilityresults.VSX_Status", eligibilityresults.VSX_Status)
                passed.push(translate('orderEligibilityResults.VSXData'))
            }

            if (eligibilityresults.Destination_Status === 0) {
                destinationErrors = Object.values(eligibilityresults.DestinationErrors).filter(function (x) {
                    return x.error !== undefined
                });
            }
            else {
                console.log("eligibilityresults.Destination_Status", eligibilityresults.Destination_Status)
                passed.push(translate('orderEligibilityResults.destinationData'))
            }

            setState({
                ...state,
                eligibilityresults: eligibilityresults,
                products: products,
                customerErrors: customerErrors,
                supplierErrors: supplierErrors,
                trailer1Errors: trailer1Errors,
                trailer2Errors: trailer2Errors,
                accountErrors: accountErrors,
                terminalErrors: terminalErrors,
                truckErrors: truckErrors,
                carrierErrors: carrierErrors,
                driverErrors: driverErrors,
                vsxErrors: vsxErrors,
                destinationErrors: destinationErrors,
                passed: passed,
            })

        }, []);

        const renderProducts = () => {
            return (
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title ><Text style={{ fontSize: hp(2.5), color: 'black' }}>{translate('orderEligibilityResults.productsToLoad')}:</Text></DataTable.Title>
                    </DataTable.Header>
                    {state.products.map(function (d, idx) {
                        return (<DataTable.Row key={idx}  >
                            <DataTable.Cell >{d.prod_name}</DataTable.Cell>
                        </DataTable.Row>)
                    })}
                </DataTable>
            )
        }

        const renderCustomerErrorsList = () => {
            return state.customerErrors.map(function (d, idx) {
                return (<List.Item key={idx} title={`• ${d.error}`} style={{ marginLeft: spacing[4] }} />)
            })

        }

        const renderCustomerList = () => {
            return (
                <React.Fragment>
                    <List.Accordion onPress={() => { setState({ ...state, scroll: false, customerErrorsOpened: !state.customerErrorsOpened }) }} right={props => state.customerErrorsOpened ? <List.Icon {...props} icon="minus" /> : <List.Icon {...props} icon="plus" />}
                        title={translate('eligibilityLoadResult.customerData')} titleStyle={{ color: 'red' }}>
                        {renderCustomerErrorsList()}
                    </List.Accordion>
                </React.Fragment>
            )
        }

        const renderSupplierErrorsList = () => {
            return state.supplierErrors.map(function (d, idx) {
                return (<List.Item key={idx} title={`• ${d.error}`} style={{ marginLeft: spacing[4] }} />)
            })
        }

        const renderSupplierList = () => {
            return (
                <React.Fragment>
                    <List.Accordion onPress={() => { setState({ ...state, scroll: false, supplierErrorsOpened: !state.supplierErrorsOpened }) }} right={props => state.supplierErrorsOpened ? <List.Icon {...props} icon="minus" /> : <List.Icon {...props} icon="plus" />}
                        title={translate('eligibilityLoadResult.supplierData')} titleStyle={{ color: 'red' }}>
                        {renderSupplierErrorsList()}
                    </List.Accordion>
                </React.Fragment>
            )
        }

        const renderTruckErrors2 = () => {
            return state.truckErrors.map(function (d, idx) {
                return (<List.Item key={idx} title={`• ${d.error}`} style={{ marginLeft: spacing[4] }} />)
            })
        }

        const renderTruck2 = () => {
            return (
                <React.Fragment>
                    <List.Accordion onPress={() => { setState({ ...state, scroll: false, truckErrorsOpened: !state.truckErrorsOpened }) }} right={props => state.truckErrorsOpened ? <List.Icon {...props} icon="minus" /> : <List.Icon {...props} icon="plus" />}
                        title={translate('eligibilityLoadResult.truckData')} titleStyle={{ color: 'red' }}>
                        {renderTruckErrors2()}
                    </List.Accordion>
                </React.Fragment>
            )
        }

        const renderTrailer1Errors2 = () => {
            return state.trailer1Errors.map(function (d, idx) {
                return (<List.Item key={idx} title={`• ${d.error}`} style={{ marginLeft: spacing[4] }} />)
            })
        }

        const renderTrailer12 = () => {
            return (
                <React.Fragment>
                    <List.Accordion onPress={() => { setState({ ...state, scroll: false, trailer1ErrorsOpened: !state.trailer1ErrorsOpened }) }} right={props => state.trailer1ErrorsOpened ? <List.Icon {...props} icon="minus" /> : <List.Icon {...props} icon="plus" />}
                        title={translate('eligibilityLoadResult.trailer1Data')} titleStyle={{ color: 'red' }}>
                        {renderTrailer1Errors2()}
                    </List.Accordion>
                </React.Fragment>
            )
        }

        const renderTrailer2Errors_ = () => {
            return state.trailer2Errors.map(function (d, idx) {
                return (<List.Item key={idx} title={`• ${d.error}`} style={{ marginLeft: spacing[4] }} />)
            })
        }

        const renderTrailer2_ = () => {
            return (
                <React.Fragment>
                    <List.Accordion onPress={() => { setState({ ...state, scroll: false, trailer2ErrorsOpened: !state.trailer2ErrorsOpened }) }} right={props => state.trailer2ErrorsOpened ? <List.Icon {...props} icon="minus" /> : <List.Icon {...props} icon="plus" />}
                        title={translate('eligibilityLoadResult.trailer2Data')} titleStyle={{ color: 'red' }}>
                        {renderTrailer2Errors_()}
                    </List.Accordion>
                </React.Fragment>
            )
        }

        const renderAccountErrorsList = () => {
            return state.accountErrors.map(function (d, idx) {
                return (<List.Item key={idx} title={`• ${d.error}`} style={{ marginLeft: spacing[4] }} />)
            })
        }

        const renderAccountList = () => {
            return (
                <React.Fragment>
                    <List.Accordion onPress={() => { setState({ ...state, scroll: false, accountErrorsOpened: !state.accountErrorsOpened }) }} right={props => state.accountErrorsOpened ? <List.Icon {...props} icon="minus" /> : <List.Icon {...props} icon="plus" />}
                        title={translate('eligibilityLoadResult.accountData')} titleStyle={{ color: 'red' }}>
                        {renderAccountErrorsList()}
                    </List.Accordion>
                </React.Fragment>
            )
        }

        const renderTerminalErrorsList = () => {
            return state.terminalErrors.map(function (d, idx) {
                return (<List.Item key={idx} title={`• ${d.error}`} style={{ marginLeft: spacing[4] }} />)
            })
        }

        const renderTerminalList = () => {
            return (
                <React.Fragment>
                    <List.Accordion onPress={() => { setState({ ...state, scroll: false, terminalErrorsOpened: !state.terminalErrorsOpened }) }} right={props => state.terminalErrorsOpened ? <List.Icon {...props} icon="minus" /> : <List.Icon {...props} icon="plus" />}
                        title={translate('eligibilityLoadResult.terminalData')} titleStyle={{ color: 'red' }}>
                        {renderTerminalErrorsList()}
                    </List.Accordion>
                </React.Fragment>
            )
        }

        const renderDestinationErrorsList = () => {
            return state.destinationErrors.map(function (d, idx) {
                return (<List.Item key={idx} title={`• ${d.error}`} style={{ marginLeft: spacing[4] }} />)
            })
        }

        const renderDestinationList = () => {
            return (
                <React.Fragment>
                    <List.Accordion onPress={() => { setState({ ...state, scroll: false, destinationErrorsOpened: !state.destinationErrorsOpened }) }} right={props => state.destinationErrorsOpened ?  <List.Icon {...props} icon="minus" /> : <List.Icon {...props} icon="plus" /> }
                        title={translate('eligibilityLoadResult.destinationData')} titleStyle={{ color: 'red' }}>
                        {renderDestinationErrorsList()}
                    </List.Accordion>
                </React.Fragment>
            )
        }

        const renderCarrierErrors2 = () => {
            return state.carrierErrors.map(function (d, idx) {
                return (<List.Item key={idx} title={`• ${d.error}`} style={{ marginLeft: spacing[4] }} />)
            })

        }

        const renderCarrier2 = () => {
            return (
                <React.Fragment>
                    <List.Accordion onPress={() => { setState({ ...state, scroll: false, carrierErrorsOpened: !state.carrierErrorsOpened }) }} right={props => state.carrierErrorsOpened ? <List.Icon {...props} icon="minus" /> : <List.Icon {...props} icon="plus" />}
                        title={translate('eligibilityLoadResult.carrierData')} titleStyle={{ color: 'red' }}>
                        {renderCarrierErrors2()}
                    </List.Accordion>
                </React.Fragment>
            )
        }

        const renderDriverErrors2 = () => {
            return state.driverErrors.map(function (d, idx) {
                return (<List.Item key={idx} title={`• ${d.error}`} style={{ marginLeft: spacing[4] }} />)
            })

        }

        const renderDriver2 = () => {
            return (
                <React.Fragment>
                    <List.Accordion onPress={() => { setState({ ...state, scroll: false, driverErrorsOpened: !state.driverErrorsOpened }) }} right={props => state.driverErrorsOpened ? <List.Icon {...props} icon="minus" /> : <List.Icon {...props} icon="plus" />}
                        title={translate('eligibilityLoadResult.driverData')} titleStyle={{ color: 'red' }}>
                        {renderDriverErrors2()}
                    </List.Accordion>
                </React.Fragment>
            )
        }



        const renderVSXErrorsList = () => {
            return state.vsxErrors.map(function (d, idx) {
                return (<List.Item key={idx} title={`• ${d.error}`} style={{ marginLeft: spacing[4] }} />)
            })

        }

        const renderVSXList = () => {
            return (
                <React.Fragment>
                    <List.Accordion onPress={() => { setState({ ...state, scroll: false, vsxErrorsOpened: !state.vsxErrorsOpened }) }} right={props => state.vsxErrorsOpened ? <List.Icon {...props} icon="minus" /> : <List.Icon {...props} icon="plus" />}
                        title={translate('eligibilityLoadResult.VSXData')} titleStyle={{ color: 'red' }}>
                        {renderVSXErrorsList()}
                    </List.Accordion>
                </React.Fragment>
            )
        }



        

        const renderPassedOnes = () => {
            return state.passed.map(function (d, idx) {
                return (<List.Item key={idx} title={`${d}`} style={{ marginLeft: spacing[4] }} titleStyle={{ color: 'green' }} />)
            })
        }

        const scrollToBottom = (scrollRef) => {
            console.log('bottom', scrollRef)
            scrollRef.current.scrollToEnd({ animated: true })
        }
        const scrollToBottom2 = () => {
            setState({ ...state, scroll: !state.scroll, passedOnesOpened: !state.passedOnesOpened })
        }

        const renderPassedSection = (scrollRef) => {
            return (
                <React.Fragment>
                    <List.Section titleStyle={{ color: 'black', fontSize: hp(2.5) }}>
                        <List.Accordion onPress={() => scrollToBottom(scrollRef)}
                            title={translate('eligibilityLoadResult.passed')} left={props => <List.Icon {...props} icon="check" color='green' />} titleStyle={{ color: 'black', fontSize: hp(2.5) }}>
                            {renderPassedOnes()}
                        </List.Accordion>
                    </List.Section>
                </React.Fragment>
            )
        }

        
        const goBack = () => navigation.goBack()

        const onErrors = (state.driverErrors.length > 0 ||
            state.carrierErrors.length > 0 ||
            state.truckErrors.length > 0 ||
            state.trailer1Errors.length > 0 ||
            state.trailer2Errors.length > 0 ||
            state.vsxErrors.length > 0 ||
            state.supplierErrors.length > 0 ||
            state.customerErrors.length > 0 ||
            state.accountErrors.length > 0 ||
            state.terminalErrors.length > 0 ||
            state.destinationErrors.length > 0)
            ? null
            : <List.Item title={translate('eligibilityLoadResult.passed')} style={{ marginLeft: spacing[4] }} />;

        return (
            <React.Fragment>
                <Box style={{ height: hp('100%'), paddingTop: 0, width: "100%", backgroundColor: 'white', flex: 1 }}>
                    <ScrollView ref={scrollViewRef} scrollEnabled={true} style={{ flex: 1 }} contentContainerStyle={{ paddingBottom:120 }}
                    onContentSizeChange={() => { state.scroll ? scrollViewRef.current.scrollToEnd({ animated: true }) : null }} >
                    <Header headerTx='eligibilityLoadResult.headerTitle' withBack={true} onLeftPress={() => navigation.goBack()} />
                        <List.Section title={translate('eligibilityLoadResult.headerTitleError')} titleStyle={{ color: 'red', fontSize: hp(2.5) }}>
                            {onErrors}

                            {state.driverErrors && state.driverErrors.length ? renderDriver2() : null}
                            {state.carrierErrors && state.carrierErrors.length ? renderCarrier2() : null}
                            {state.truckErrors && state.truckErrors.length ? renderTruck2() : null}
                            {state.trailer1Errors && state.trailer1Errors.length ? renderTrailer12() : null}
                            {state.trailer2Errors && state.trailer2Errors.length ? renderTrailer2_() : null}
                            {state.vsxErrors && state.vsxErrors.length ? renderVSXList() : null}
                            {state.supplierErrors && state.supplierErrors.length ? renderSupplierList() : null}
                            {state.customerErrors && state.customerErrors.length ? renderCustomerList() : null}
                            {state.accountErrors && state.accountErrors.length ? renderAccountList() : null}
                            {state.terminalErrors && state.terminalErrors.length ? renderTerminalList() : null}
                            {state.destinationErrors && state.destinationErrors.length ? renderDestinationList() : null}
                        </List.Section>

                        <View style={{ marginBottom: spacing[3] }}>
                            {renderProducts()}
                        </View>

                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title ><Text style={{ fontSize: hp(2.5), color: 'black' }}>{translate('eligibilityLoadResult.request')}:</Text></DataTable.Title>
                            </DataTable.Header>

                            <DataTable.Row  >
                                <DataTable.Cell>{translate('eligibilityLoad.terminal')}:</DataTable.Cell>
                                <DataTable.Cell numeric>{term_id}</DataTable.Cell>
                            </DataTable.Row>

                            <DataTable.Row >
                                <DataTable.Cell>{translate('eligibilityLoad.suppliers')}:</DataTable.Cell>
                                <DataTable.Cell numeric>{supplier_no}</DataTable.Cell>
                            </DataTable.Row>


                            <DataTable.Row>
                                <DataTable.Cell>{translate('eligibilityLoad.tractorTruck')}:</DataTable.Cell>
                                <DataTable.Cell numeric>{truckLabel.key}</DataTable.Cell>
                            </DataTable.Row>

                            <DataTable.Row>
                                <DataTable.Cell>{translate('eligibilityLoad.trailer1')}:</DataTable.Cell>
                                <DataTable.Cell numeric>{trailer1Label.key}</DataTable.Cell>
                            </DataTable.Row>

                            <DataTable.Row>
                                <DataTable.Cell>{translate('eligibilityLoad.trailer2')}:</DataTable.Cell>
                                <DataTable.Cell numeric>{trailer2Label.key}</DataTable.Cell>
                            </DataTable.Row>

                            <DataTable.Row>
                                <DataTable.Cell>{translate('eligibilityLoad.customer')}:</DataTable.Cell>
                                <DataTable.Cell numeric>{cust_no}</DataTable.Cell>
                            </DataTable.Row>

                            <DataTable.Row>
                                <DataTable.Cell>{translate('eligibilityLoad.account')}:</DataTable.Cell>
                                <DataTable.Cell numeric>{acct_no}</DataTable.Cell>
                            </DataTable.Row>

                            <DataTable.Row>
                                <DataTable.Cell>{translate('eligibilityLoad.destination')}:</DataTable.Cell>
                                <DataTable.Cell numeric>{destination_no}</DataTable.Cell>
                            </DataTable.Row>
                        </DataTable>

                        <React.Fragment>
                            <List.Section titleStyle={{ color: 'black', fontSize: hp(2.5) }}>
                                <List.Accordion onPress={() => scrollToBottom2()} right={props => state.passedOnesOpened ? <List.Icon {...props} icon="minus" /> : <List.Icon {...props} icon="plus" />}
                                    title={translate('eligibilityLoadResult.passed')} left={props => <List.Icon {...props} icon="check" color='green' />} titleStyle={{ color: 'black', fontSize: hp(2.5) }}>
                                    {state.passed.map(function (d, idx) {
                                        return (<List.Item key={idx} title={`${d}`}  right={props => <List.Icon {...props} icon="check" color="green" />} style={{ marginLeft: spacing[4] }} titleStyle={{ color: 'green' }} >ss</List.Item>)
                                    })}
                                </List.Accordion>
                            </List.Section>
                        </React.Fragment>



                    </ScrollView>
                     
                </Box>

            </React.Fragment>
        )
     
    }
