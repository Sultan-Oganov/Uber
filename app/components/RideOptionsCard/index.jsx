import React, { useState } from "react";
import { FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import { Icon } from "@rneui/base";
import { useNavigation } from '@react-navigation/native';
import { rideData } from "../../modules/mocks";
import { useSelector } from 'react-redux';
import { selectTravelTimeInformation } from '../../modules/redux/slices/navSlice';

//if we have SURGE pricing, this go up
const SURGE_CHARGE_RATE = 1.5;

export const RideOptionsCard = () => {
  const { goBack } = useNavigation();
  const [selected, setSelected] = useState(null);
  const trevelTimeInfo = useSelector(selectTravelTimeInformation);

  const handleSelect = (item) => {
    setSelected(item);
  }

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View style={tw``}>
        <TouchableOpacity
          onPress={goBack}
          style={tw`absolute top-4 left-5 p-3 rounded-full z-10`}
        >
          <Icon
            name="chevron-left"
            type="font-awesome"
            size={12}
          />
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl`}>Select a Ride - {trevelTimeInfo?.distance?.text}</Text>
      </View>
      <FlatList
        data={rideData}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
            onPress={() => handleSelect(item)}
            style={tw`flex-row justify-between items-center  px-10 ${id === selected?.id && 'bg-gray-200'}`}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: 'contain'
              }}
              source={{ uri: image }}

            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`}>{title}</Text>
              <Text>{trevelTimeInfo?.duration?.text}</Text>
            </View>
            <Text style={tw`text-xl`}>
              {
                new Intl.NumberFormat('en-gb', {
                  style: 'currency',
                  currency: 'GBP'
                })
                .format((trevelTimeInfo?.duration.value * SURGE_CHARGE_RATE * multiplier)/100)
              }
            </Text>
          </TouchableOpacity>
        )}
      />
      <View style={tw`mt-auto border-t border-gray-200`}>
        <TouchableOpacity
          disabled={!selected}
          style={tw`bg-black py-3 m-3 ${!selected && 'bg-gray-300'}`}>
          <Text style={tw`text-center text-white text-lg`}>Choose {selected?.title}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
