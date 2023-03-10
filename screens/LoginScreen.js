import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'tailwind-react-native-classnames'
import { Image } from 'react-native-elements'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/native'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
            navigation.replace("HomeScreen")
        }
    })
    return unsubscribe
  }, [])

  const handleSignUp = () => {
    auth
    .createUserWithEmailAndPassword(email, password)
    .then(userCredentials => {
        const user = userCredentials.user
    })
    .catch(error => {
        alert(error)
    }) 
  }

  const handleLogin = () => {
    auth
    .signInWithEmailAndPassword(email, password)
    .then(userCredentials => {
        const user = userCredentials.user
    })
    .catch(error => {
        alert(error)
    }) 
  }
  
    return (
    <KeyboardAvoidingView style={[tw`flex-1 justify-center items-center`]} >
        <Image 
        style = {{
            width: 150, height: 150, resizeMode: 'contain'
        }}
        source={require('../images/TAXISHERE-bgless.png')} />
        <View style={{width: "90%"}}>
            <TextInput
                placeholder='Email'
                value={email}
                onChangeText={text => setEmail(text)}
                style={tw`bg-white px-5 py-3 rounded-sm mt-5`}
            />
            <TextInput
                placeholder='Mot de passe'
                value={password}
                onChangeText={text => setPassword(text)}
                style={tw`bg-white px-5 py-3 rounded-sm mt-5`}
                secureTextEntry
            />
        </View>
        <View style={[tw`justify-center items-center mt-20`, {width: "60%"}]}>
            <TouchableOpacity
            style={[tw`bg-yellow-200 rounded-lg flex-row justify-center items-center p-2`, {width: "100%"}]}
                onPress={() => {handleLogin()}}  
                >
                <Text style={tw`text-xl font-bold text-center text-black p-2`}>Se connecter</Text>
            </TouchableOpacity>


            <Text style={tw`text-center mt-10  font-bold`} > Vous n'avez pas de compte ?</Text> 
            <TouchableOpacity
            style={[tw`bg-black rounded-lg flex-row justify-center items-center p-2 mt-5`, {width: "100%"}]}
                onPress={() => {navigation.navigate("InscriptionScreen")}}  
                >
                <Text style={tw`text-xl font-normal text-left text-white p-2`}>S'inscrire</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={[tw`bg-white rounded-lg flex-row justify-center items-center p-2 mt-10`, {width: "100%"}]}
                onPress={() => {navigation.navigate("HomeScreen")}}  
                >
                <Text style={tw`text-base text-left text-black p-2`}>Continuer en tant qu'anonyme</Text>
            </TouchableOpacity>

        </View>
    </KeyboardAvoidingView>


  )
}

export default LoginScreen

const styles = StyleSheet.create({})