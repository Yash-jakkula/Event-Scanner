import Login from "./Login";
import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Scanner from "./Scanner";

const stack = createNativeStackNavigator();
const Main = () => {
    return (
        <stack.Navigator>
           <stack.Screen 
           name="Login"
           component={Login}
           />
           <stack.Screen 
           name="Details"
           component={Scanner}
           />
        </stack.Navigator>
    )
}


export default Main;