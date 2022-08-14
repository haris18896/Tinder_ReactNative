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

## Creating a useAuth Custom Hook
first we will create an `AuthProvider` and will wrap our app with it. this `AuthProvider` is an HOC `Higher Order Component`. which is a mechanism in which the Parent injects all of its power in to the child, in this case all of the authentications power to the child.
```js
// App.js
import { NavigationContainer } from '@react-navigation/native'
import { AuthProvider } from './hooks/useAuth'
import StackNavigator from './StackNavigator'

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StackNavigator />
      </AuthProvider>
    </NavigationContainer>
  )
}
```



## Adding the Context API
initially the `authContext` will be empty.
```js
const AuthContext = createContext({})
```
then after this we will be wrapping our `hook` with a provider. `AuthContext.Provider` is a component that provides the value to the child.

and the `value` in this provider is similar to the store in the redux. initially we are going to take it as null.

at this point `value` is null, but we will be updating it to the proper value.
```js
import { View, Text } from 'react-native'
import React from 'react'
import { createContext } from 'react'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>
}
```

we will be using firebase and google authentication, and for google authentication we will be mostly using `expo-auth-session`

```
expo install expo-auth-session expo-random
```

```js
import React from 'react'
import { createContext, useContext } from 'react'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider
      value={{
        user: 'Haris'
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext)
}
```

## Building the Login Functionality (2/2)
```js
// StackNavigator.js
  const { user } = useAuth()
  console.log('user : ', user)
```

## Setting up Firebase
* first make a project on google cloud, with the same we can make a firebase project, so that our credentials will be added directly to the GCP.

* Go to console --> Add Project --> project Name e.g(tinder-c1) --> disable google analytics --> project settings --> add two projects one for ios and other for android

* * ios --> `apple bundle id == host.exp.exponent` (this allows expo to get through the google sort of safety restrictions when you try to login through google, if you don't do this then on logging in it will say `redirect uri error` on deployment we will be changing this bundle id),  `App NickName(optional) === 'tinder'`
* * download the config file `download GoogleServices-info.plist`, this is like a key that connects us to the backend.
* * * and then add that to our project
* * and then press on continue. and then finish
* if it's all done perfectly then you should have a `<project nickname>` app inside the `project settings` tab.

* do the same thing for the android.
* * click on add app
* * * and then repeat the above steps for android too.
* * * download `Google-Services.json` its same as `GoogleService-info.plist`
* * * after all the steps `add fingerprint` in the android project
* in VS code run this command `expo fetch:android:hashes` if it did not worked then `logged in to expo` and then make a build for android `expo build:android` and then name your project as `host.exp.exponent`  
* once you get the hashes copy the `SHA-256: xxxxxxxxxxxxxxxxxxxxxxxxxx` and paste it in the `add fingerprint` section in the android project.

* at this point we should have two apps in the `project settings`.

```
npm install -g eas-cli
eas build -p android
```
* if any problem arise then you will have to install `JAVA` on to your machine
  
## Adding Firebase to the App

now we are going to add firebase to our app.

first we will be installing [expo-auth-session](https://www.npmjs.com/package/expo-auth-session) 

documentation for [expo-auth-session](https://github.com/expo/expo/blob/main/docs/pages/versions/unversioned/sdk/auth-session.md)

```
expo install expo-auth-session expo-random
```

To use this module, you need to set up React Native deep linking in your application. For more information, check out [React Native documentation](https://reactnative.dev/docs/linking)

first import everything from google provider and after we will be installing firebase

```js
// useAuth.js
import React, { createContext, useContext } from 'react'
import * as Google from 'expo-auth-session/providers/google'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {

    const signInWithGoogle = async () => {
        await Google.logInAsync()
    }

  return (
    <AuthContext.Provider
      value={{
        user: null
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext)
}
```

# Publishing out app to expo

```
expo install expo-updates
npm install -g eas-cli
eas build -p android
```

and after this log in to expo

```
expo login
```

and our app will be published to expo, which then we can use offline too.

