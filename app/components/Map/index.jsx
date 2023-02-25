import React, { useEffect, useRef } from "react";
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from "react-native-maps-directions";
import { useDispatch, useSelector } from "react-redux";
import tw from "twrnc";
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../../modules/redux/slices/navSlice';
import { GOOGLE_MAPS_KEY } from '@env';
import { getMapUrl } from '../../modules/api/index';

export const Map = () => {
    const dispatch = useDispatch();
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const mapRef = useRef(null);

    useEffect(() => {
        if (!origin || !destination) return;
        
        //Zoom & fit to markers
        mapRef.current.fitToSuppliedMarkers(['origin', 'destination'],{ edgePadding: {
            top: 50, right: 50, bottom: 50, left: 50
        }});
    }, [origin, destination]);
    
    useEffect(() => {
        if (!origin || !destination) return;

        const getTravelTime = () => {
            const url = getMapUrl(origin, destination, GOOGLE_MAPS_KEY);
            fetch(url)
            .then(req => req.json())
            .then(res => dispatch(setTravelTimeInformation(res.rows[0].elements[0])))
        }
        getTravelTime();
    }, [origin, destination, GOOGLE_MAPS_KEY]);

    return (
        <MapView
            ref={mapRef}
            style={tw`flex-1`}
            mapType="mutedStandard"
            initialRegion={{
                latitude: origin.location.lat,
                longitude: origin.location.lng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
        >
            {origin && destination && (
                <MapViewDirections
                    origin={origin.description}
                    destination={destination.description}
                    apikey={GOOGLE_MAPS_KEY}
                    strokeWidth={3}
                    strokeColor={'black'}
                />
            )}
            {
                origin?.location && (
                    <Marker
                        coordinate={{
                            latitude: origin?.location.lat,
                            longitude: origin?.location.lng,
                        }}
                        title={origin?.description}
                        identifier="origin"
                    />
                )
            }
            {
                destination?.location && (
                    <Marker
                        coordinate={{
                            latitude: destination?.location.lat,
                            longitude: destination?.location.lng,
                        }}
                        title={destination?.description}
                        identifier="destination"
                    />
                )
            }
        </MapView>
    );
};
