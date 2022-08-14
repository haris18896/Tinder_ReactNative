# Tinder Clone : Home Screen
if the user is not true then the app will only be showing the login page, once the user logged in then the 
the app will be redirected and the user will be able to use rest of the app. now we are going to add authentication via context api

```js
// StackNavigator.js
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
```