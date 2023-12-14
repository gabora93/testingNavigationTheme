import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MenuScreen from "../src/screens/MenuScreen";
import ProfileScreen from "../src/screens/ProfileScreen";
import SettingsScreen from "../src/screens/SettingsScreen";
import AboutScreen from "../src/screens/AboutScreen";
import PrivacyPolicyScreen from "../src/screens/PrivacyPolicyScreen";

const StackMenu = createNativeStackNavigator();

export default function MenuStack(){
    return(
        <StackMenu.Navigator>
        <StackMenu.Screen name="Menu"component={MenuScreen} options={{ headerShown: false }}
        />
        <StackMenu.Screen name="profile" component={ProfileScreen} options={{headerShown: false }}  />
        <StackMenu.Screen name="settings" component={SettingsScreen} options={{headerShown: false }}  />
        <StackMenu.Screen name="about" component={AboutScreen} options={{headerShown: false }}  />
        <StackMenu.Screen name="privacy_policy" component={PrivacyPolicyScreen} options={{headerShown: false }}  />
      </StackMenu.Navigator>
    )
}