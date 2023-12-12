import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../src/screens/Home";
import BOLScreen from "../src/screens/Bols";
import DetailsScreen from "../src/screens/Details";
import MenuScreen from '../src/screens/MenuScreen';
import MenuStack from './MenuStack';
import { StyleSheet, Text, View, Button } from 'react-native';


const Tab = createBottomTabNavigator();

let bgcolor = '$darkBlue700'

export const TabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
            <Tab.Screen name="Bills" component={BOLScreen} options={{headerShown: false}} />
            <Tab.Screen name="Menu" component={MenuStack} options={{headerShown: false}}/>
        </Tab.Navigator>
    );
};