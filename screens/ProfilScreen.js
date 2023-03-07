import { Image, StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';
 
const ProfilScreen = ({route}) => {
    const item = route.params;
    const navigation = useNavigation()
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
        <View style={tw`p-5`}>
        <Image
        style = {{
            width: 150, height: 150, resizeMode: 'contain'
        }}
        source={require('../images/TAXISHERE-bgless.png')} />
        
            <Text>ProfilDriver</Text>
            <Text> Nom: {item.title} </Text>
            <Text> Voiture: {item.voiture} </Text>
        </View>

    </SafeAreaView>
  )
}

export default ProfilScreen

const styles = StyleSheet.create({})