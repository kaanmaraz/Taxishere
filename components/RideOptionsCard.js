import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import tw from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectTravelTimeInformation } from '../slices/navSlice'


const data = [
  {
    id: "Jean-Pierre", 
    title: "Jean-Pierre", 
    voiture: "Nissan Qashqai"
  }, 
  {
    id: "Jacques", 
    title: "Jacques", 
    voiture: "Toyota avensis"
  }, 
  {
    id: "Kaan", 
    title: "Kaan", 
    voiture: "Peugeot 308"
  },
  {
    id: "Habib", 
    title: "Habib", 
    voiture: "Passat"
  }
]

const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  return (
    <SafeAreaView
      style={tw`bg-white flex-grow`}>
        <View>
          <TouchableOpacity style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`} 
            onPress={() => navigation.navigate('NavigateCard')}>
            <Icon name='chevron-left' type='fontawesome' />
          </TouchableOpacity>
          <Text style={tw`ml-5 text-center py-5 text-xl`} >  Liste des chauffeurs autour de vous</Text>
        </View>
      
        <FlatList data={data}
          keyExtractor={(item) => item.id}
          renderItem={({item : {id, title, voiture}, item}) => (
              <TouchableOpacity 
                onPress={() => setSelected(item)}
                style={[tw`flex-row justify-around items-center p-5 ${id === selected?.id && 'bg-gray-200'} `]} >

                <Icon type='font-awesome-5' name='user-tie'/>
                <View style={tw`-ml-6`} >
                  <Text style={tw`text-xl font-semibold`} >{title}</Text>
                  <Text >{voiture}</Text>
                </View>
                <View style={[tw`flex-row justify-center items-center`, {width: '30%'}]}>
                <TouchableOpacity 
                  onPress={() => navigation.navigate('ProfilScreen', item)}
                  style={tw`rounded-full bg-yellow-200 p-4`}>
                  <Text style={tw`text-lg font-semibold`} >Profil</Text>
                </TouchableOpacity>
              </View>
              </TouchableOpacity>
          )}
        />

        <View style={tw` flex-row justify-around mt-auto border-t border-gray-200`} >
          <TouchableOpacity disabled={!selected} style={tw`flex-row justify-around bg-black p-3 m-3 rounded-lg ${!selected && 'bg-gray-300'}`} >
            <Icon type='font-awesome-5' name='check' color='white'/>
            <Text style={tw`text-center text-white text-xl`} > Choisir {selected?.title} </Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default RideOptionsCard

const styles = StyleSheet.create({})