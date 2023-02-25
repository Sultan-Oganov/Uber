import React from "react";
import { TouchableOpacity, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import tw from "twrnc";
import { Icon } from "@rneui/base";
import { useNavigation } from '@react-navigation/native';
import { Map } from "../components/Map";
import { NavigateCard } from "../components/NavigateCard";
import { RideOptionsCard } from '../components/RideOptionsCard';

const Stack = createNativeStackNavigator();

export const MapScreen = () => {
  const { navigate } = useNavigation();

  const handleNavigate = () => {
    navigate('HomeScreen');
  }

  return (
    <View>
      <TouchableOpacity
        onPress={handleNavigate}
        style={tw`bg-gray-100 absolute z-10 top-16 left-8 p-3 rounded-full shadow-lg`}
      >
        <Icon name="menu" />
      </TouchableOpacity>
      <View style={tw`h-1/2`}>
        <Map />
      </View>
      <View style={tw`h-1/2`}>
        <Stack.Navigator>
          <Stack.Screen
            name="NavigateCard"
            component={NavigateCard}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="RideOptionsCard"
            component={RideOptionsCard}
            options={{
              headerShown: false
            }}
          />
        </Stack.Navigator>
      </View>
    </View>
  );
};
