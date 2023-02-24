import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import tw from "twrnc";
import { GOOGLE_MAPS_KEY } from '@env';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { setDestination } from "../../modules/redux/slices/navSlice";

export const NavigateCard = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  const handleSetDestination = (data, details = null) => {
    dispatch(setDestination({
      location: details.geometry.location,
      description: data.description
    }));

    navigate('RideOptionsCard');
  }

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-xl`}>Good moringing, Darling</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
          <GooglePlacesAutocomplete
            placeholder="Where to ?"
            nearbyPlacesAPI="GooglePlacesSesarch"
            debounce={400}
            styles={styles}
            query={{
              key: GOOGLE_MAPS_KEY,
              language: 'en'
            }}
            enablePoweredByContainer={false}
            minLength={2}
            onPress={handleSetDestination}
            returnKeyType={"search"}
            fetchDetails={true}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 20,
    flex: 0
  },
  textInput: {
    backgroundColor: '#dddddf',
    borderRadius: 0,
    fontSize: 18
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0
  }
});
