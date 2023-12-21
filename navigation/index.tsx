import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, StyleProp, TextStyle} from 'react-native';
import { ShareIcon, Icon, Text, FlatList, ScrollView, View} from '@gluestack-ui/themed';
import HomeScreen from "../src/screens/Home";
import BOLScreen from "../src/screens/Bols";
import DetailsScreen from "../src/screens/Details";
import MenuScreen from '../src/screens/MenuScreen';
import MenuStack from './MenuStack';
import { Home, FileText, AlignJustify, CheckCircle } from 'lucide-react-native';
import EliMenuScreen from '../src/screens/EliMenuScreen';
import { i18n } from '../src/i18n/i18n';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import { StyledLinearGradient } from '../src/components/styledComponents/StyledLinearGradient';
import  GradientIcon  from '../src/components/styledComponents/GradientIcon';
import  GradientText  from '../src/components/styledComponents/GradientText';
const Tab = createBottomTabNavigator();

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },};

export const TabNavigator = () => {
  const insets = useSafeAreaInsets();
  console.log('inset',insets)
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIconStyle:{marginTop:7},
          animationEnabled: true,
          swipeEnabled : true,
          tabBarHideOnKeyboard: true,
          keyboardHidesTabBar: true,
          tabBarLabel: ({ focused, color, size }) => {
            let label;
            if (route.name === 'Home') {
              label = focused ? <GradientText colors={['white', 'cyan']} text={i18n.t(`smallMenu.home`)}/> : <GradientText colors={['#1F4F7B', 'white']} text={i18n.t(`smallMenu.home`)}/> 
            }
            else if (route.name === 'Bols') {
              label = focused ? <GradientText colors={['white', 'cyan']} text={i18n.t(`smallMenu.bol`)}></GradientText> : <GradientText colors={['#1F4F7B', 'white']} text={i18n.t(`smallMenu.bol`)}/> 
            }
            else if (route.name === 'MenuStack') {
              label = focused ? <GradientText colors={['white', 'cyan']} text={i18n.t(`smallMenu.menu`)}></GradientText> : <GradientText colors={['#1F4F7B', 'white']} text={i18n.t(`smallMenu.menu`)}/> 
            }
            else if (route.name === 'Eligilibility') {
              label = focused ? <GradientText colors={['white', 'cyan']} text={i18n.t(`smallMenu.eligibility`)}></GradientText> : <GradientText colors={['#1F4F7B', 'white']} text={i18n.t(`smallMenu.eligibility`)}/> 
            }
            return label
          },
          tabBarStyle: { height: "10%" , width:'100%', paddingBottom: insets.bottom},
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = focused ? Home : Home;
              } else if (route.name === 'Bols') {
                iconName = focused ? FileText  : FileText;
              }else if (route.name === 'MenuStack') {
                iconName = focused ? AlignJustify  : AlignJustify;
              }else if (route.name === 'Eligilibility') {
                iconName = focused ? CheckCircle   : CheckCircle;
              }
              return focused ?  <GradientIcon colors={['cyan', 'white']} as={iconName}/> :  <GradientIcon colors={['white', 'white']} as={iconName}/>;
            }, tabBarBackground: () => (
              <View style={{ flex: 1 }}>
                <StyledLinearGradient locations={[0.5, 0.1]}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 0, y: 0 }}
                  colors={["#133352", "#1F4F7B"]}
                  style={{ height: 90 }}
                />
              </View>
            ),
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'gray',
          })}>
            <Tab.Screen name="Home" component={HomeScreen} options={{headerShown: false }} />
            <Tab.Screen name="Bols" component={BOLScreen} options={{headerShown: false,tabBarLabelStyle:{fontSize:12, fontWeight:'bold'} }} />
            <Tab.Screen name="Eligilibility" component={EliMenuScreen} options={{headerShown: false,tabBarLabelStyle:{fontSize:12, fontWeight:'bold'}  }} />
            <Tab.Screen name="MenuStack" component={MenuStack} options={{headerShown: false,tabBarLabelStyle:{fontSize:12, fontWeight:'bold'} }}/>
        </Tab.Navigator>
    );
};