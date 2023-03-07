import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import tw from 'tailwind-react-native-classnames'
import NavOptions from '../components/NavOptions'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_MAPS_API_KEY } from '@env'
import { useDispatch, useSelector } from 'react-redux'
import { setOrigin , setDestination, selectOrigin } from '../slices/navSlice'
import NavFavourites from '../components/NavFavourites'
import { Button, Icon } from 'react-native-elements'
import * as Location from 'expo-location';
import { useEffect } from 'react'
import { auth } from '../firebase'
import { useNavigation, NavigationContainer } from '@react-navigation/native'
import Sidebar from '../components/Sidebar'


const HomeScreen = () => {

  // Variables //////////
  const dispatch = useDispatch();
  var origin = useSelector(selectOrigin);
  const [currentLocation, setCurrentLocation] = useState(null);
  const navigation = useNavigation()
  // Variables //////////

  // Fonctions //////////
  async function getLocationAsync() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }
  
    const location = await Location.getCurrentPositionAsync({});

    let adresse
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=${GOOGLE_MAPS_API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        adresse = data.results[0].formatted_address
        dispatch(setOrigin({
          location: {
            lat: location.coords.latitude, 
            lng: location.coords.longitude
          }, 
          description: adresse
        }));
        dispatch(setDestination(null));
      })
  }

  const handleSignOut = () => {
    auth  
    .signOut()
    .then(() => {
      navigation.replace("LoginScreen")
    })
    .catch(error => alert(error.message))
  }
  // Fonctions //////////
  

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
        
      {/* <Sidebar/> */}
      {/* <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => navigation.openDrawer()}
        />
      </HeaderButtons> */}
      <View View style={tw`absolute right-3 top-20`}>
        <TouchableOpacity 
          style={tw`rounded-full bg-white p-1`}
          onPress={() => navigation.openDrawer()} >
          <Icon name='bars' type='font-awesome-5' />
        </TouchableOpacity>
      </View>



      <View style={tw`p-5`} >
      
        <View style={tw`flex-row justify-between items-center`} >
          <Image 
          style = {{
              width: 150, height: 150, resizeMode: 'contain'
          }}
          source={require('../images/TAXISHERE-bgless.png')} />

        </View>

        <View>
          <Text style={tw`text-center text-xl font-semibold mb-10`} > Lieu de départ : {origin?.description}  </Text>

          <GooglePlacesAutocomplete
            styles={{
              container: {
                flex: 0
              }, 
              textInput: {
                fontSize: 18,
              }
            }}
            enablePoweredByContainer={false}
            returnKeyType={"search"}
            minLength={2}
            onPress={(data, details = null) => {
              dispatch(setOrigin({
                location: details.geometry.location, 
                description: data.description
              }));
              dispatch(setDestination(null));
            }}
            fetchDetails={true}
            query={{
              key: GOOGLE_MAPS_API_KEY, 
              language: 'fr'
            }}
            placeholder='Chercher une adresse...' 
            nearbyPlacesAPI='GooglePlacesSearch'
            debounce={400}  
          />

          <View style={tw`mt-5 border-t border-gray-200 pt-5`}>
            <TouchableOpacity
              style={tw`bg-yellow-200 rounded-full flex-row justify-center items-center p-1`}
              onPress={getLocationAsync}
              >
                <Icon style={tw`text-white`} name='map-pin' type='font-awesome' color='black'  />
              <Text style={tw`text-xl text-center text-black p-2`} >Me localiser</Text>
            </TouchableOpacity>
          </View>


        </View>
        <NavFavourites/>
        
        <NavOptions/>

        
      </View>

    </SafeAreaView>
  )
}

export default HomeScreen
