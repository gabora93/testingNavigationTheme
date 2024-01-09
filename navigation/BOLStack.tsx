import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MenuScreen from "../src/screens/MenuScreen";
import ProfileScreen from "../src/screens/ProfileScreen";
import SettingsScreen from "../src/screens/SettingsScreen";
import AboutScreen from "../src/screens/AboutScreen";
import BOLScreen from "../src/screens/Bols";

import PrivacyPolicyScreen from "../src/screens/PrivacyPolicyScreen";
import BolViewerScreen from "../src/screens/BolViewer";

const StackBOL = createNativeStackNavigator();

export default function BOLStack() {
  return (
    <StackBOL.Navigator screenOptions={{ animation: 'slide_from_right', headerShown: false }}>
      <StackBOL.Screen name="Bols" component={BOLScreen}/>
      <StackBOL.Screen name="bol_viewer" component={BolViewerScreen} />
    </StackBOL.Navigator>
  )
}