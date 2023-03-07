import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native'
import { Icon } from 'react-native-elements'
import React, { useState } from 'react'
import tw from 'tailwind-react-native-classnames';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <View>
        {/* <View style={tw`absolute right-3 top-20`} >
            <TouchableOpacity 
              style={tw`rounded-full bg-white p-1`}
              onPress={() => setIsOpen(true)} >
              <Icon name='bars' type='font-awesome-5' />
            </TouchableOpacity>
        </View> 
        <View style={ isOpen ? styles.overlay : null } /> */}
        <SafeAreaView style={[styles.sidebar, { right: isOpen ? 0 : -250 }, tw`bg-gray-100 h-full pt-10 justify-between`]}>
            <View>
                <TouchableOpacity
                style={tw`rounded-full p-1 justify-start`}
                onPress={() => setIsOpen(false)} >
                <Icon name='arrow-left' type='font-awesome-5' />
                </TouchableOpacity>

                <TouchableOpacity 
                style={tw`rounded-full p-1 justify-start`}
                onPress={() => setIsOpen(false)} >
                <Text> Mes informations </Text>
                </TouchableOpacity>
            </View>

            <View>
                <TouchableOpacity 
                style={tw`flex-row rounded-full p-1 justify-start items-center`}
                onPress={() => handleSignOut()} >
                <Icon name='sign-out-alt' type='font-awesome-5' />
                <Text style={tw`font-semibold ml-2`} >Me déconnecter</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
      </View>
    );
}

export default Sidebar


const styles = StyleSheet.create({
    text: {
        color: 'blue'
    }, 
    sidebar: {
      width: 250,
      backgroundColor: 'white',
      padding: 20,
      zIndex: 10000,
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1, 
      opacity: 1
  },
  sidebarVisible:{
    zIndex: 2
  }
})