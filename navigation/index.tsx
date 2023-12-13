import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, StyleProp, TextStyle} from 'react-native';
import { ShareIcon, Icon, Text, FlatList, ScrollView} from '@gluestack-ui/themed';
import HomeScreen from "../src/screens/Home";
import BOLScreen from "../src/screens/Bols";
import DetailsScreen from "../src/screens/Details";
import MenuScreen from '../src/screens/MenuScreen';
import MenuStack from './MenuStack';
import { Home, FileText, AlignJustify, CheckCircle } from 'lucide-react-native';
import EliMenuScreen from '../src/screens/EliMenuScreen';
import { translations } from '../src/i18n/localization';
import { translate } from "../src/i18n/translate";
import { i18n } from '../src/i18n/i18n';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  const insets = useSafeAreaInsets();
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
          tabBarStyle: { height: 70 + insets.bottom, width:'100%', paddingBottom:9 },
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = focused ? Home : Home;
              } else if (route.name === 'Bills') {
                iconName = focused ? FileText  : FileText;
              }else if (route.name === 'Menu') {
                iconName = focused ? AlignJustify  : AlignJustify;
              }else if (route.name === 'Eligilibility') {
                iconName = focused ? CheckCircle   : CheckCircle;
              }
              return <Icon as={iconName}  color={color} size={30} />;
            },
            tabBarActiveTintColor: '#1F4F7B',
            tabBarInactiveTintColor: 'gray',
          })}>
            <Tab.Screen name="Home" component={HomeScreen} options={{headerShown: false, tabBarLabel: i18n.t('smallMenu.home'),
         
         
          tabBarAllowFontScaling:true,
          tabBarItemStyle:{borderColor: 'red'},}} />
            <Tab.Screen name="Bills" component={BOLScreen} options={{headerShown: false, tabBarLabel: i18n.t('smallMenu.bol') }} />
            <Tab.Screen name="Eligilibility" component={EliMenuScreen} options={{headerShown: false, tabBarLabel: i18n.t('smallMenu.eligibility')  }} />
            <Tab.Screen name="Menu" component={MenuStack} options={{headerShown: false, tabBarLabel: i18n.t('smallMenu.menu')  }}/>
        </Tab.Navigator>
    );
};