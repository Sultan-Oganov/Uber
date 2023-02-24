import React from "react";
import { Image, SafeAreaView, View } from "react-native";
import { useDispatch } from "react-redux";
import tw from "twrnc";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_KEY } from "@env";
import { NavOptions } from "../components/NavOptions";
import { setOrigin, setDestination } from "../modules/redux/slices/navSlice";

export const HomeScreen = () => {
  const dispatch = useDispatch();
  
  const handleSetOrigin = (data, details = null) => {
    dispatch(setOrigin({
      location: details.geometry.location,
      description: data.description
    })); 
    dispatch(setDestination(null));
  }

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Image
          style={{
            width: 100, height: 100, resizeMode: 'contain'
          }}
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'
          }}
        />
        <GooglePlacesAutocomplete
          placeholder="Where from?"
          nearbyPlacesAPI="GooglePlacesSesarch"
          debounce={400}
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              fontSize: 18
            }
          }}
          query={{
            key: GOOGLE_MAPS_KEY,
            language: 'en'
          }}
          enablePoweredByContainer={false}
          minLength={2}
          onPress={handleSetOrigin}
          returnKeyType={"search"}
          fetchDetails={true}
        />
        <NavOptions />
      </View>
    </SafeAreaView>
  );
};

