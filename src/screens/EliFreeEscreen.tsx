import React, { FC } from "react"
import { TextStyle, ViewStyle, View, ImageStyle, Text, FlatList, StyleSheet, TouchableOpacity, Linking, Platform  } from "react-native"
import { Screen, Button, AutoImage as Image, Header, Text as Texts } from "../components/components"
import EligibilityService from '../services/axiosapi/EligibilityService';
import { color, spacing } from "../theme"
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { isIphoneX, getStatusBarHeight } from 'react-native-iphone-x-helper';
 
 
import { DefaultTheme, DataTable, List } from 'react-native-paper';
import { getFromSecureStore } from "../../services/helper";

const TITLE_STYLE: TextStyle = {
    color: color.palette.black,
    lineHeight: 23,
    textAlign: 'center'
}

const TITLE_CONTAINER: ViewStyle = {
    flex: 1,
    alignItems: 'center',
    top: hp(5),
    height: hp('100%'),

}
const TEXT_CONTAINER: ViewStyle = {
    flex: 1,
    alignItems: 'center',
    top: hp(5), backgroundColor: "#1f4f7b",
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
const LIST_STYLE: ViewStyle = {
    marginTop: spacing[1]

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
    paddingLeft: spacing[5],
    right: spacing[5]
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

const initialState = {
    email: "",
    password: "",
    showPassword: true,
    errors: {},
    terminals: []
};


export default function EligibilityFreeScreen({ navigation }){
        // Pull in one of our MST stores
        // const { someStore, anotherStore } = useStores()
        const [state, setState] = React.useState(initialState);
        const goToOrder = () => navigation.navigate("order_elegibility")
        const gotoLoad = () => navigation.navigate("load_elegibility")
        const goBack = () => navigation.goBack()

        React.useEffect(() => {

            getTerminals()

        }, []);
        // Pull in navigation via hook
        // const navigation = useNavigation()
        const B = (props) => <Text style={{ fontWeight: 'bold' }}>{props.children}</Text>
        const U = (props) => <Text style={{fontWeight: 'bold', color:'#1f4f7b' }}>{props.children}</Text>

        const getTerminals = async () => {
            try {
                console.log("getting Terminals: ...")
                const license = await getFromSecureStore("license");
                // const license = await getFromSecureStore("license");
                console.log("license", license)
                let body = {
                    license: license
                };

                const response = await EligibilityService.getTerminalsByLicence(body)
                console.log("response getTerminals", response.data.result)

                const dropDownArray = Object.values(response.data.result[0].Terminals).map(({ name: title, term_id: id }) => ({ id, title })).filter(function (x) {
                    return x.id !== undefined
                });
                console.log(">>>>>>>>>>>>>>dropDownArray>>>>>>>>>>>>>>>>>", dropDownArray)

                setState({ ...state, terminals: dropDownArray });
            } catch (error) {
                console.log("error", error)
            }
        }



        const handleClickHere = () => {
            var link = ""
            if (Platform.OS === 'ios') {
                // do something for ios
                 link = 'https://apps.apple.com/us/app/l2d-driver-connect-enterprise/id1562874616';
              } else if (Platform.OS === 'android') {
                // other thing for android
                link = 'https://play.google.com/store/apps/details?id=com.toptech.toptechdriver';
              }
            Linking.canOpenURL(link).then(supported => {
                supported && Linking.openURL(link);
            }, (err) => console.log(err));
        }

        return (
            <React.Fragment>
                <StatusBar />
                <Container style={{ height: hp('100%'), paddingTop: 0, width: "100%", backgroundColor: 'white' }}>
                    <Content scrollEnabled={false} >
                        <Header
                            headerTx="eligibilityFreeScreen.headerTitle"
                            style={HEADER}
                            leftIcon="back"
                            onLeftPress={goBack}
                            titleStyle={HEADER_TITLE}
                        />

                        <View style={styles.MainContainer}>

                            <TouchableOpacity style={styles.TextViewStyle} onPress={handleClickHere}>
                                <Texts style={TITLE_STYLE} tx="eligibilityFreeScreen.description"/>
                                
                                
                            </TouchableOpacity>


                        </View>
                        <View style={styles.listContainer}>
                            <Texts tx="eligibilityFreeScreen.subtitle" style={{color:"black"}}/>
                            <FlatList style={LIST_STYLE}
                                data={state.terminals}
                                keyExtractor={({ id }, index) => id}
                                renderItem={({ item }) => (
                                    <Text><B>{item.title}</B></Text>
                                )}
                            />
                        </View>



                    </Content>
                     
                </Container>

            </React.Fragment>
        )
    }
    
const styles = StyleSheet.create(
    {
        MainContainer:
        {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',

        },
        listContainer:
        {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: hp(4),
            height: hp('50%')

        },

        TextViewStyle:
        {
            borderWidth: 1,
            borderRadius: 10,
            borderColor: '#1f4f7b',
            width: '80%',
            padding: 5,
            backgroundColor: 'white',
            marginTop: hp(3),
            shadowColor: 'rgba(0, 0, 0, 0.2)',
            shadowOpacity: 9.8,
            elevation: 6,
            shadowRadius: 15,
            shadowOffset: { width: 1, height: 13 },

        },

        TextStyle:
        {
            textAlign: 'center',
            color: '#000',
            padding: 10

        }

    });
