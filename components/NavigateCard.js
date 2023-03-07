import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import { GOOGLE_MAPS_API_KEY } from '@env'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { useDispatch, useSelector } from 'react-redux'
import { selectDestination, selectOrigin, setDestination } from '../slices/navSlice'
import { useNavigation } from '@react-navigation/native'
import NavFavourites from './NavFavourites'
import { Icon } from 'react-native-elements'


const NavigateCard = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation()
    const origin = useSelector(selectOrigin)
    const destination = useSelector(selectDestination)
  return (
    <SafeAreaView 
        style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-xl`} >Destination : {destination?.description} </Text>
      <View style={tw`border-t border-gray-200 flex-shrink`} > 
        <View>
            <GooglePlacesAutocomplete 
                placeholder='Où allez-vous ?'
                behavior="padding"
                styles={toInputBoxStyles}
                fetchDetails={true}
                returnKeyType={"search"}
                minLength={2}
                onPress={(data, details = null) => {
                    dispatch(setDestination({
                        location: details.geometry.location, 
                        description: data.description
                    }))
                }}
                enablePoweredByContainer={false}
                query={{
                    key: GOOGLE_MAPS_API_KEY, 
                    language: "fr"
                }}
                debounce={400}
                nearbyPlacesAPI="GooglePlacesSearch"
            />
        </View>
        
        <NavFavourites/>
      </View>

      <View style={tw`flex-row bg-white justify-around items-center mt-auto py-2 border-t border-gray-100`} >
        <TouchableOpacity 
            disabled={!origin || !destination}
            onPress={() => console.log(destination)}
            style={tw`flex flex-row justify-between ${(!origin || !destination) ? 'bg-gray-300' : 'bg-yellow-200'}  rounded-full p-2`}>
            
            <Icon name='hand-paper' type='font-awesome-5' color="black" />
            <Text style={tw`text-black text-center text-lg`}> Appeler </Text>
        </TouchableOpacity>
        <TouchableOpacity 
            disabled={!origin || !destination}
            onPress={() => navigation.navigate('RideOptionsCard')}
            style={tw`flex flex-row justify-between ${(!origin || !destination) ? 'bg-gray-300' : 'bg-yellow-200'} rounded-full p-2`}>
            
            <Icon name='user-tie' type='font-awesome-5' color="black" />
            <Text style={tw`text-black text-center text-lg`}> Trouver des chauffeurs </Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
}

export default NavigateCard

const toInputBoxStyles = StyleSheet.create({
    container: {
        backgroundColor: "white", 
        paddingTop: 20, 
        flex: 0
    }, 
    textInput: {
        backgroundColor: "#DDDDDF", 
        borderRadius: 0, 
        fontSize: 18
    }, 
    textInputContainer: {
        paddingHorizontal: 20, 
        paddingBottom: 0, 
    }
})