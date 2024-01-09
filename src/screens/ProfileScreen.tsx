import { StyledBox, StyledButton, StyledButtonText } from '../components/styledComponents/index';
import { Header } from "../components/header/Header";
import ButtonGroup from '../components/buttons/ButtonGroup';
import { profileButtons } from '../utilities/menuButtons';
import { Globe, FileText, CheckCheck, Container } from 'lucide-react-native';
import { ModalComponent } from '../components/modal/ModalComponent';
import { useState, useCallback, useEffect, useContext } from "react";
import { Image, Icon, Input, InputField, styled, Pressable, VStack, Center, HStack, View, Text , Box, ButtonSpinner } from '@gluestack-ui/themed';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Localization from 'expo-localization';
import { StackActions } from '@react-navigation/native';
import { getFromSecureStore } from '../services/helper';
import { i18n } from '../i18n/i18n';
import ProfileService from "../services/axiosapi/ProfileService";

const initialState = {
  email: "",
  license: "",
  first_name: "",
  last_name: "",
  deviceTokenString: "",
  refresh: false,
  visible: false,
};

export default function ProfileScreen({ route, navigation }) {
  const [isOpen, setIsOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const insets = useSafeAreaInsets();
  let [locale, setLocale] = useState(Localization.locale);
  const [state, setState] = useState(initialState);
  const [avatarInitials, setAvatarInitials] = useState("");
    const { updateToken } = ProfileService();
  const settingLocale = (locale) => {
    console.log(locale);
    navigation.dispatch(StackActions.replace('eligibility_menu'))
    setLocale(locale);
  }

  useEffect(() => {
    getProfileInfo()

  }, [state.refresh]);

  const generateBadge = (name, lastname) => {
    let initials = name.charAt(0).toLocaleUpperCase() + "" + lastname.charAt(0).toLocaleUpperCase();
    setAvatarInitials(initials)
    console.log('badge:', initials)
  }

  const InitialIcon = ({ initials }) => {
    return (
      <View marginTop="$2"
        style={{
          backgroundColor: 'blue',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 30,
          width: 50,
          height: 50,
        }}>
        <Text style={{ color: 'white', fontSize: 20 }}>{initials}</Text>
      </View>
    );
  };



  const getProfileInfo = async () => {
    console.log("getting profile info")
    const license = await getFromSecureStore("license");
    const first_name = await getFromSecureStore("firstName");
    const last_name = await getFromSecureStore("lastName");
    const email = await getFromSecureStore("userEmail");
    const notificationToken = await getFromSecureStore("notification_token");
    generateBadge(first_name, last_name)
    setState({ ...state, license: license, first_name: first_name, last_name: last_name, email: email, deviceTokenString: notificationToken })
    let name = state.first_name.charAt(0).toUpperCase()+state.first_name.slice(1);
    console.log('name', name)
    console.log('firstname: ', first_name, "lastname ", last_name, 'email', email, 'notificationtoken', notificationToken)
  }


  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  
  const updateTokens = async () => {
    try {
        let body = {
            loginName: state.email,
            deviceTokenString: state.deviceTokenString
        };
        console.log('body', body);
        const response = await updateToken(body);
        console.log('response update token', response.data);
        console.log('status', response.data.result[0].Status);

        if (response.data.result[0].Status === "OK") {

            Alert.alert(translate('generalAlarms.alertSuccessNotiTokenUdt'), translate('generalAlarms.alertSuccessNotiTokenUdt2'), [
                {
                    text: "OK", onPress: () => {
                        // navigation.goBack()
                        // onSelect()
                    }
                }
            ]);

        } else {
            Alert.alert("", translate('generalAlarms.alertTokenNotUpdated'), [
                { text: "OK", onPress: () => { } }
            ]);
        }



    } catch (e) {
        console.log('e', e);
        handleAlertAppErrorEncounterOpen();
        console.log(e)
    }
}

  console.log('inset', insets)
  return (
    <>
      <StyledBox flex={1} paddingTop={insets.top} $light-bg='$light200' $dark-bg='$backgroundDark950' alignItems='center'>
        <Header headerTx='profile.headerTitle' withBack={true} onLeftPress={() => navigation.goBack()} />
        <Box marginBottom="$8" marginTop="$8" alignContent='center' alignItems='center'>
        {avatarInitials ? <InitialIcon initials={avatarInitials}/> : <ButtonSpinner/>}
        <HStack>
        <Text>{state.first_name.charAt(0).toUpperCase()+state.first_name.slice(1)} </Text>
        <Text>{state.last_name.charAt(0).toUpperCase()+state.last_name.slice(1)}</Text>
        </HStack>
      
        <VStack justifyContent='center' alignContent='center' alignItems='center'>
        <Text>{`${i18n.t('profile.DrivLicence')} ${state.license}`}</Text>
        <Text>{`${i18n.t('profile.email')} ${state.email}`}</Text>

        </VStack>
        </Box>
        <VStack w="$5/6" marginTop="$2">
        { profileButtons.map((button, index)=>(
          <StyledButton marginBottom="$3" sx={{ _dark: { borderColor: 'cyan', borderBottomColor: '$red900', borderBottomWidth: 5 }, _light: { variant: 'solid' } }} variant='outline' hardShadow="4"
          onPress={() => button.route === "updateToken" ? updateTokens() : navigation.navigate(button.route) } key={index} alignItems="center" justifyContent='center' h='$16' >
             <StyledButtonText sx={{ _dark: { color: 'white' }, _light: { color: '#1F4F7B' } }}>{i18n.t(button.label)}</StyledButtonText>
         </StyledButton>
        ))}
        </VStack>
        {/* <ButtonGroup buttons={profileButtons} navigation={navigation} space={'xl'} buttonHeight={'$16'} openModal={handleOpen} /> */}
        <HStack justifyContent='center'>
          <ModalComponent setRefresh={setRefresh} state={refresh} isOpened={isOpen} handleOpen={handleOpen} handleClose={handleClose} setIsOpen={setIsOpen} setLocale={settingLocale} locale={locale} />
        </HStack>

      </StyledBox>

    </>
  )
};