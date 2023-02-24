import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from './HomeScreen';
import { MapScreen } from "./MapScreen";

const Stack = createNativeStackNavigator();

export const RootStack = () => {

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="MapScreen"
                component={MapScreen}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
};


