import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MenuScreen from "../src/screens/MenuScreen";
import ProfileScreen from "../src/screens/ProfileScreen";
import SettingsScreen from "../src/screens/SettingsScreen";
import AboutScreen from "../src/screens/AboutScreen";
import PrivacyPolicyScreen from "../src/screens/PrivacyPolicyScreen";

const StackMenu = createNativeStackNavigator();

export default function MenuStack() {
  return (
    <StackMenu.Navigator screenOptions={{ animation: 'slide_from_right', headerShown: false }}>
      <StackMenu.Screen name="Menu" component={MenuScreen}/>
      <StackMenu.Screen name="profile" component={ProfileScreen} />
      <StackMenu.Screen name="settings" component={SettingsScreen} />
      <StackMenu.Screen name="about" component={AboutScreen} />
      <StackMenu.Screen name="privacy_policy" component={PrivacyPolicyScreen} />
    </StackMenu.Navigator>
  )
}