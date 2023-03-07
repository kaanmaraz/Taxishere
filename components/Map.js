import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import MapView, { Marker } from 'react-native-maps'
import tw from 'tailwind-react-native-classnames'
import { useDispatch, useSelector } from 'react-redux'
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../slices/navSlice'
import MapViewDirections from 'react-native-maps-directions'
import { GOOGLE_MAPS_API_KEY } from '@env'


const Map = () => {
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination)
    const mapRef = useRef(null)
    const dispatch = useDispatch();

    // Ce code vas s'éxecuter à chaque fois que origin et destination vont changer

    useEffect(() => {
      if (!origin || !destination) return;
      // Zoom and fit destination marker 
      mapRef.current.fitToCoordinates(
        [
          { latitude: origin.location.lat, longitude: origin.location.lng },
          { latitude: destination.location.lat, longitude: destination.location.lng },
        ], 
        {edgePadding: {top: 50, bottom: 50, right: 50, left:50}}
      );


      const getTravelTime = async() => {
        fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_API_KEY}`)
          .then((response) => response.json())
          .then((data) => {
            dispatch(setTravelTimeInformation(data.rows[0].elements[0]))
          })
      }

      getTravelTime();

    }, [origin, destination]);

  return (
    <MapView
        ref={mapRef}
        style={tw`flex-1`}
        mapType="mutedStandard"
        initialRegion={{
            latitude: origin.location.lat, 
            longitude: origin.location.lng, 
            latitudeDelta: 0.005, 
            longitudeDelta: 0.005
        }}
    >
      {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={GOOGLE_MAPS_API_KEY}
          strokeColor="black"
          strokeWidth={3}
        />
      )}

      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat, 
            longitude: origin.location.lng, 
          }}
          title="Lieu de départ"
          description={origin.description}
          identifier="origin"
        />
      )}
          
      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat, 
            longitude: destination.location.lng, 
          }}
          title="Lieu d'arrivée"
          description={destination.description}
          identifier="destination"
        />
      )}
    </MapView>


  )
}

export default Map

const styles = StyleSheet.create({})