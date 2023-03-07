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
  }, 
  {
    id: "Jacques", 
    title: "Jacques", 
  }, 
  {
    id: "Kaan", 
    title: "Kaan", 
  },
  {
    id: "Habib", 
    title: "Habib", 
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
          renderItem={({item : {id, title, multiplier, image}, item}) => (
            <TouchableOpacity 
              onPress={() => setSelected(item)}
              style={tw`flex-row justify-between items-center px-10 p-5 ${id === selected?.id && 'bg-gray-200'} `} >
              {/* <Image
                style={{
                  width: 100, 
                  height: 100, 
                  resizeMode: "contain"
                }}
                source={{uri:image}}
              /> */}

              <Icon type='font-awesome-5' name='user-tie'/>
              <View style={tw`-ml-6`} >
                <Text style={tw`text-xl font-semibold`} >{title}</Text>
                {/* <Text> Tps trajet : {travelTimeInformation?.duration?.text} </Text> */}
              </View>
              {/* <Text style={tw`text-xl`} >

                {new Intl.NumberFormat('fr-fr', {
                  style: 'currency', 
                  currency: 'EUR'
                }).format(
                  (travelTimeInformation?.duration?.value * SURGE_CHARGE_RATE * multiplier) / 100
                )}

              </Text> */}
            </TouchableOpacity>
          )}
        />

        <View style={tw`mt-auto border-t border-gray-200`} >
          <TouchableOpacity disabled={!selected} style={tw`bg-black py-3 m-3 ${!selected && 'bg-gray-300'} `} >
            <Text style={tw`text-center text-white text-xl`} >Choose {selected?.title} </Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default RideOptionsCard

const styles = StyleSheet.create({})