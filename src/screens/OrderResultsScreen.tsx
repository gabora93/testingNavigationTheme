import React, { FC, useRef } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, ViewStyle, View, ImageStyle, ScrollView } from "react-native"
import { Screen, Text, Button, AutoImage as Image } from "../components/components"
import { color, spacing } from "../theme"
import { Body, Form, Box } from '@gluestack-ui/themed';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Header } from "../components/header/Header";
import { DefaultTheme, DataTable, List } from 'react-native-paper';
import { translate } from "../i18n/i18n"
import { i18n } from '../i18n/i18n';

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
    orderErrors: [],
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

export default function OrderResultsScreen({ navigation, route }){
        // Pull in one of our MST stores
        // const { someStore, anotherStore } = useStores()
        const { eligibilityresults, license,
            term_id,
            supplier_no,
            truck_id, truckLabel, trailer1Label, trailer2Label,
            trailer1_id,
            trailer2_id, order } = route.params;
        console.log("LOAD itemId", eligibilityresults)
        console.log("LOAD itemId", truckLabel)
        console.log("LOAD trailer1Label", trailer1Label)
        console.log("license license", license)
        console.log(i18n.locale);
        console.log(i18n.locale.slice(0,2));
        const goToOrder = () => navigation.navigate("order_elegibility")
        const gotoLoad = () => navigation.navigate("load_elegibility")
        const [state, setState] = React.useState(initialState);
        const scrollViewRef = useRef();
        React.useEffect(() => {
            console.log("LoadResultsScreen")
            console.log("LOAD eligibilityresults", eligibilityresults)
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
            var orderErrors = []
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

            if (eligibilityresults.Order_Status === 0) {
                orderErrors = Object.values(eligibilityresults.OrderErrors).filter(function (x) {
                    return x.error !== undefined
                });
            }
            else {
                console.log("eligibilityresults.Order_Status", eligibilityresults.Order_Status)
                passed.push(translate('orderEligibilityResults.orderData'))
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
                orderErrors: orderErrors,
                passed: passed
            })

        }, []);


        const renderProducts = () => {
            return (
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title ><Text style={{ fontSize: hp(2.5), color: 'black' }}>{translate('orderEligibilityResults.productsToLoad')}:</Text></DataTable.Title>
                    </DataTable.Header>
                    {state.products.map(function (d, idx) {
                        return (<DataTable.Row   >
                            <DataTable.Cell key={idx}>{d.prod_name}</DataTable.Cell>
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
                        title={translate('orderEligibilityResults.customerData')} titleStyle={{ color: 'red' }}>
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
                        title={translate('orderEligibilityResults.supplierData')} titleStyle={{ color: 'red' }}>
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
                        title={translate('orderEligibilityResults.truckData')} titleStyle={{ color: 'red' }}>
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
                        title={translate('orderEligibilityResults.trailer1Data')} titleStyle={{ color: 'red' }}>
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
                        title={translate('orderEligibilityResults.trailer2Data')} titleStyle={{ color: 'red' }}>
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
                        title={translate('orderEligibilityResults.accountData')} titleStyle={{ color: 'red' }}>
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
                        title={translate('orderEligibilityResults.terminalData')} titleStyle={{ color: 'red' }}>
                        {renderTerminalErrorsList()}
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
                        title={translate('orderEligibilityResults.carrierData')} titleStyle={{ color: 'red' }}>
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
                        title={translate('orderEligibilityResults.driverData')} titleStyle={{ color: 'red' }}>
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
                        title={translate('orderEligibilityResults.VSXData')} titleStyle={{ color: 'red' }}>
                        {renderVSXErrorsList()}
                    </List.Accordion>
                </React.Fragment>
            )
        }



        const renderDestinationErrorsList = () => {
            return state.destinationErrors.map(function (d, idx) {
                return (<List.Item key={idx} title={`• ${d.error}`} style={{ marginLeft: spacing[4] }} />)
            })
        }

        const renderPassedOnes = () => {
            return state.passed.map(function (d, idx) {
                return (<List.Item key={idx} title={`${d}`} style={{ marginLeft: spacing[4] }}  right={props => <List.Icon {...props} icon="check" color="green" />} titleStyle={{ color: 'green' }} />)
            })
        }

        const renderPassedSection = () => {
            return (
                <React.Fragment>
                    <List.Section titleStyle={{ color: 'black', fontSize: hp(2.5) }}>
                        <List.Accordion onPress={() => scrollToBottom()} right={props => state.passedOnesOpened ? <List.Icon {...props} icon="minus" /> : <List.Icon {...props} icon="plus" />} titleStyle={{ color: 'black', fontSize: hp(2.5) }}
                            title={translate('orderEligibilityResults.passedError')} left={props => <List.Icon {...props} icon="check" color='green' />}  >
                            {renderPassedOnes()}
                        </List.Accordion>
                    </List.Section>
                </React.Fragment>
            )
        }

        const renderDestinationList = () => {
            return (
                <React.Fragment>
                    <List.Accordion onPress={() => { setState({ ...state, scroll: false, destinationErrorsOpened: !state.destinationErrorsOpened }) }} right={props => state.destinationErrorsOpened ? <List.Icon {...props} icon="minus" /> : <List.Icon {...props} icon="plus" />}
                        title={translate('orderEligibilityResults.destinationData')} titleStyle={{ color: 'red' }}>
                        {renderDestinationErrorsList()}
                    </List.Accordion>
                </React.Fragment>
            )
        }

        const renderOrderErrors = () => {
            return state.orderErrors.map(function (d, idx) {
                return (<List.Item key={idx} title={`• ${d.error}`} style={{ marginLeft: spacing[4] }} />)
            })
        }

        const renderOrdersList = () => {
            return (
                <React.Fragment>
                    <List.Accordion onPress={() => { setState({ ...state, scroll: false, orderErrorsOpened: !state.orderErrorsOpened }) }} right={props => state.orderErrorsOpened ? <List.Icon {...props} icon="minus" /> : <List.Icon {...props} icon="plus" />}
                        title={translate('orderEligibilityResults.orderData')} titleStyle={{ color: 'red' }}>
                        {renderOrderErrors()}
                    </List.Accordion>
                </React.Fragment>
            )
        }

        const scrollToBottom = () => {
            setState({ ...state, scroll: !state.scroll, passedOnesOpened: !state.passedOnesOpened })
        }

        const onErrors = (state.orderErrors.length > 0 ||
            state.driverErrors.length > 0 ||
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
            : <List.Item title="No errors found" style={{ marginLeft: spacing[4] }} />;

        return (
            <React.Fragment>
                <Box style={{ height: hp('100%'), paddingTop: 0, width: "100%", backgroundColor: 'white' }}>
                    <ScrollView ref={scrollViewRef} scrollEnabled={true} style={{ flex: 1 }}
                     onContentSizeChange={() => { state.scroll ? scrollViewRef.current.scrollToEnd({ animated: true }) : null }}
                     contentContainerStyle={{ paddingBottom:120 }} >
                    <Header headerTx='orderEligibility.headerTitle' withBack={true} onLeftPress={() => navigation.goBack()} />
                        <List.Section title={translate('orderEligibilityResults.headerTitleError')} titleStyle={{ color: 'red', fontSize: hp(2.5) }}>
                            {onErrors}
                            {state.orderErrors && state.orderErrors.length ? renderOrdersList() : null}
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
                            {state.products.length > 0 ? renderProducts() : null}
                        </View>
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title ><Text style={{ fontSize: hp(2.5), color: 'black' }}>{translate('orderEligibilityResults.request')}:</Text></DataTable.Title>
                            </DataTable.Header>
                            <DataTable.Row  >
                                <DataTable.Cell>{translate('orderEligibility.terminal')}:</DataTable.Cell>
                                <DataTable.Cell numeric>{term_id}</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row >
                                <DataTable.Cell>{translate('orderEligibility.suppliers')}:</DataTable.Cell>
                                <DataTable.Cell numeric>{supplier_no}</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row>
                                <DataTable.Cell>{translate('orderEligibility.tractorTruck')}:</DataTable.Cell>
                                <DataTable.Cell numeric>{truckLabel.key}</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row>
                                <DataTable.Cell>{translate('orderEligibility.trailer1')}:</DataTable.Cell>
                                <DataTable.Cell numeric>{trailer1Label.key}</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row>
                                <DataTable.Cell>{translate('orderEligibility.trailer2')}:</DataTable.Cell>
                                <DataTable.Cell numeric>{trailer2Label.key}</DataTable.Cell>
                            </DataTable.Row>
                        </DataTable>
                        {renderPassedSection()}
                    </ScrollView>
                     
                </Box>
            </React.Fragment>
        )
    }