import { useState, createContext, useCallback, useContext } from 'react';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context'
import { ThemeContext } from './src/context/ThemeContext'
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthenticatedTabNavigator } from './navigation';
import { GluestackUIProvider, Box } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { AuthContext as AC } from './src/services/authContext';
import * as React from 'react';
import { getFromSecureStore, deleteKeySecureStore, saveOnSecureStore } from './src/services/helper';
import * as Notifications from 'expo-notifications';
import * as Font from 'expo-font';
import { useAuth } from './src/i18n/hooks/useAuth';
import { AuthContext } from './src/context/AuthContext';
import * as Localization from 'expo-localization';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown'

import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import * as SplashScreen from 'expo-splash-screen';
import UnauthenticatedStackNavigator from './navigation/UnauthenticatedStack';
import { de, en, es, fr, it, nl, pl, registerTranslation, TranslationsType } from 'react-native-paper-dates';

SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const locales: [string, TranslationsType][] = [
  ['de', de],
  ['en', en],
  ['es', es],
  ['fr', fr],
  ['it', it],
  ['nl', nl],
  ['pl', pl]
];


const initialLoginState = {
  isLoading: true,
  userName: null,
  userToken: null,
  isRegistered: null,
  notification: {},
}

const App = () => {

  // const { user, login, logout, setUser } = useAuth();

  const [state, setState] = React.useState({ initialLoginState });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [colorMode, setColorMode] = useState<"dark" | "light">("light");
  const [fontsLoaded, error] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  })

  const loginReducer = (prevState: any, action: any) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        console.log("RETRIEVE_TOKEN DISPATCHED")
        console.log("action", action)
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
          isRegistered: action.registerID
        };
      case 'LOGIN':
        return {
          ...prevState,
          userToken: action.token,
          userName: action.id,
          isLoading: false,
        };
      case 'LOGOUT':
        console.log("LOGOUT DISPATCHED")
        return {
          ...prevState,
          userToken: null,
          userName: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          isRegistered: action.id,
          isLoading: false,
        };
    }
  }

  const _handleNotification = notification => {
    setState({ notification: notification });
  };

  const _handleNotificationResponse = response => {
    console.log('_handleNotificationResponse', response);
  };


  const authContext = React.useMemo(() => ({
    signIn: (token: string, username: string) => {
      let userToken;
      let userName;
      userToken = token;
      userName = username;
      dispatch({ type: 'LOGIN', id: userName, token: userToken })
    },
    signOut: async () => {
      try {
        deleteKeySecureStore("jwt");
        //deleteKeySecureStore("jwt")
        //  delete axios.defaults.headers.common["Authorization"];
        dispatch({ type: 'LOGOUT' })
      } catch (error) {
        throw new Error(error);
      }
    },
    signUp: (registerData: any) => {
      dispatch({ type: 'REGISTER', id: registerData, })
    },
  }), [])

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState)


  React.useEffect(() => {
    console.log("Loading App TopTech Load2Day")
    console.log('Current LOCALE: ', Localization.locale)
    const loadFonts = async function () {
      console.log("APP loadingfonts")
      try {
        (async () => await Font.loadAsync({
          Roboto: require('./assets/fonts/Roboto-Regular.ttf'),
          Roboto_medium: require('./assets/fonts/Roboto-Medium.ttf'),
        }))();
        Notifications.addNotificationReceivedListener(_handleNotification);
        Notifications.addNotificationResponseReceivedListener(_handleNotificationResponse);
      } catch (e) {
        console.log("PERMISOS", e)
      }
    }
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await getFromSecureStore("jwt");
      } catch (e) {
      }
      let registerUUID;
      registerUUID = null;
      try {
        registerUUID = await getFromSecureStore("registerID");
        //registerUUID = await getFromSecureStore("registerID");
      } catch (e) {
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken, registerID: registerUUID })
    }, 2000);
    //loginState.isLoading && loadFonts()
    loadFonts();
  }, [loginState.userToken]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  if (error) {
    console.log('error', error)
  }

  const toggleColorMode = async () => {
    setColorMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <>
      <AutocompleteDropdownContextProvider>
        <AC.Provider value={authContext}>
          <NavigationContainer onReady={onLayoutRootView} >
            <SafeAreaProvider initialMetrics={initialWindowMetrics}>
              <GluestackUIProvider colorMode={colorMode} config={config}>
                <ThemeContext.Provider value={{ colorMode, toggleColorMode }}>

                  { loginState.userToken ? <AuthenticatedTabNavigator /> : <UnauthenticatedStackNavigator />}
                  {/* {loginState.userToken ? <UnauthenticatedStackNavigator /> : <AuthenticatedTabNavigator />} */}
                </ThemeContext.Provider>
              </GluestackUIProvider>
            </SafeAreaProvider>
          </NavigationContainer>
        </AC.Provider>
      </AutocompleteDropdownContextProvider>
    </>
  );
};

export default App;