import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectOrigin } from '../slices/navSlice'

const data = [
  {
    id: "123", 
    title: "Chercher un taxi", 
    image: "https://links.papareact.com/3pn", 
    screen: "MapScreen"
  }, 
]
const NavOptions = () => {
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin)
  return (
    <TouchableOpacity 
      onPress={() => navigation.navigate("MapScreen")}
      style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-60 mt-10`}
      disabled={!origin}
      >
      <View style={tw`${!origin && 'opacity-20'}`} >
        <Image
          style={{ width: 120, height: 120, resizeMode: "contain" }}
          source={{ uri: "https://links.papareact.com/3pn" }}
        />
        <Text style={tw`mt-2 text-lg font-semibold`} > {"Chercher un taxi"} </Text>
        <Icon 
          style={tw`p-2 bg-yellow-200 rounded-full w-10 mt-4`}
          name='arrowright' 
          color="black" 
          type='antdesign' />
      </View>
    </TouchableOpacity>
  )
}

export default NavOptions
