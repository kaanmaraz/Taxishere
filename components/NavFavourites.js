import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'
import tw from 'tailwind-react-native-classnames'

const data = [
    {
      id: "123", 
      icon: "home", 
      location: "Chez moi",
      destination: "La Verpillière, France"
    }, 
    {
      id: "456", 
      icon: "briefcase", 
      location: "Le travail",
      destination: "Vienne, France"
    }, 
  ]
const NavFavourites = () => {
  return (
    <View style={tw`mt-5 border-t border-gray-200 pt-2 p-3`} >
      <Text style={tw`text-lg mb-5`}>Choisir parmis les lieux enregistrés : </Text>
      <FlatList
      horizontal
      data={data}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => {
        <View style={[tw`bg-gray-200`, {height: 0.5}]}/>
      }}
      renderItem={({item: {location, destination, icon}}) => (
      <TouchableOpacity style={tw`flex-row items-center p-1`}>
        <Icon
          style={tw`mr-4 rounded-full bg-gray-300 p-3`}
          name={icon}
          type="ionicon"
          color="white"
          size={18} 
          />  
          <View>
            <Text style={tw`font-semibold text-lg`} >{location}</Text>
            <Text style={tw`text-gray-500`} >{destination}</Text>
          </View>
      </TouchableOpacity>
    )}/>
    </View>

    
  )
}

export default NavFavourites

const styles = StyleSheet.create({})