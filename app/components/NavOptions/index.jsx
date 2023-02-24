import React from "react";
import { FlatList, Text, TouchableOpacity, View, Image } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Icon } from '@rneui/themed';
import tw from "twrnc";
import { navData } from "../../modules/mocks";
import { selectOrigin } from "../../modules/redux/slices/navSlice";

export const NavOptions = () => {
    const {navigate} = useNavigation();
    const origin = useSelector(selectOrigin );
 
    const handleNavigate = (screen) => {
        navigate(screen);
    }

    return (
        <FlatList
            data={navData}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
                <TouchableOpacity
                    style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}
                    onPress={()=>handleNavigate(item.screen)}
                    disabled={!origin}
                >
                    <View style={tw`${!origin && 'opacity-50'}`}>
                        <Image
                            source={item.image}
                            style={{
                                width: 120, height: 120, resizeMode: 'contain'
                            }}
                        />
                        <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
                        <Icon 
                        style={tw`p-2 bg-black rounded-full w-10 mt-4`}
                        type="antdesign" color="white" name="arrowright"/>

                    </View>
                </TouchableOpacity>
            )}
        />
    );
};


