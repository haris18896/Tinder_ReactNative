import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './Screens/home/HomeScreen'
import ChatScreen from './Screens/chat/ChatScreen'
import LoginScreen from './Screens/login/LoginScreen'

const Stack = createNativeStackNavigator()

const StackNavigator = () => {
  // now it's similar to Route system in react js
  const user = true
  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen
            name='Home'
            component={HomeScreen}
            options={{
              presentation: 'fullScreenModal',
              headerShown: false
            }}
          />
          <Stack.Screen
            name='Chat'
            component={ChatScreen}
            options={{
              presentation: 'fullScreenModal'
              //   headerShown: false
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name='Login'
            component={LoginScreen}
            options={{
              presentation: 'fullScreenModal'
              //   headerShown: false
            }}
          />
        </>
      )}
    </Stack.Navigator>
  )
}

export default StackNavigator
