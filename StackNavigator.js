import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './Screens/home/HomeScreen'
import ChatScreen from './Screens/chat/ChatScreen'

const Stack = createNativeStackNavigator()

const StackNavigator = () => {
  // now it's similar to Route system in react js
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Home'
        component={HomeScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name='Chat'
        component={ChatScreen}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  )
}

export default StackNavigator
