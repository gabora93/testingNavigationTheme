import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailsScreen from "../src/screens/Details";
import MenuScreen from "../src/screens/MenuScreen";

const FeedStack = createNativeStackNavigator();


export default function MenuStack(){
    return(
        <FeedStack.Navigator>
        <FeedStack.Screen
          name="MenuScreen"
          component={MenuScreen}
          options={{ headerShown: false }}
        />
        <FeedStack.Screen name="Details" component={DetailsScreen} />
      </FeedStack.Navigator>
    )
}