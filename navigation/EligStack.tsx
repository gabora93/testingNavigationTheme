import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OrderElegibilityScreen from "../src/screens/OrderEliScreen";
import LoadElegibilityScreen from "../src/screens/LoadEliScreen";
import OrderResultsScreen from "../src/screens/OrderResultsScreen";
import LoadResultsScreen from "../src/screens/LoadResultsScreen";
import EliMenuScreen from "../src/screens/EliMenuScreen";

const StackBOL = createNativeStackNavigator();

export default function EligStack() {
  return (
    <StackBOL.Navigator screenOptions={{ animation: 'slide_from_right', headerShown: false }}>
      <StackBOL.Screen name="eligibility_menu" component={EliMenuScreen}/>
      <StackBOL.Screen name="order_elegibility" component={OrderElegibilityScreen}/>
       <StackBOL.Screen name="order_results" component={OrderResultsScreen}/>
      <StackBOL.Screen name="load_elegibility" component={LoadElegibilityScreen}/>
      <StackBOL.Screen name="load_results" component={LoadResultsScreen}/> 
    </StackBOL.Navigator>
  )
}