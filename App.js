import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import ProfilScreen from './screens/ProfilScreen';
import { store } from './store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'intl'
import 'intl/locale-data/jsonp/en-GB'
import 'intl/locale-data/jsonp/fr-FR'
import LoginScreen from './screens/LoginScreen';
import InscriptionScreen from './screens/InscriptionScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Sidebar from './components/Sidebar';

export default function App() {
  const Stack = createNativeStackNavigator();
  const DrawerNavigator = createDrawerNavigator();
  return (
    <Provider store={store}>

      <NavigationContainer>
        <SafeAreaProvider>
          <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" :"height"  }
            style={{ flex: 1 }} 
            keyboardVerticalOffset={Platform.OS == "ios" ? -64 : 0}>
            <Stack.Navigator>

            <Stack.Screen
                name='LoginScreen'
                component={LoginScreen}
                options={{
                  headerShown: false
                }}
              />
              <Stack.Screen
                name='Drawer'
                component={Sidebar}
                options={{
                  headerShown: false
                }}
              />
              <Stack.Screen
                name='InscriptionScreen'
                component={InscriptionScreen}
                options={{
                  headerShown: false
                }}
              />
              <Stack.Screen
                name='HomeScreen'
                component={HomeScreen}
                options={{
                  headerShown: false
                }}
              />
              <Stack.Screen
                name='MapScreen'
                component={MapScreen}
                options={{
                  headerShown: false
                }}
              />
              <Stack.Screen
                name='ProfilScreen'
                component={ProfilScreen}
                options={{
                  headerShown: false
                }}
              />
            </Stack.Navigator>
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </NavigationContainer>

    </Provider>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
