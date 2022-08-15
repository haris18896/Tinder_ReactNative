# Tinder Clone : Google Authentication

Authentication docs for [auth-session](https://docs.expo.dev/versions/v43.0.0/sdk/auth-session/)

we could not get the hashes because 
```
The operation couldn’t be completed. Unable to locate a Java Runtime.
```

* install `java`
* build android app `eas build -p android`
* fetch hashes `expo fetch:android:hashes`

---

add the client id's from `google-services.json` and `GoogleService-Info.plist` to the `useAuth.js`.

for this we should use environment variables because we didn't want this to be disclosed.

```js
// useAuth.js
import React, { createContext, useContext } from 'react'
import * as Google from 'expo-auth-session/providers/google'
import { IOS_CLIENT_ID, ANDROID_CLIENT_ID, BUNDLE_ID } from '@env'

const AuthContext = createContext({})

const config = {
  iosClientId: IOS_CLIENT_ID,
  androidClientId: ANDROID_CLIENT_ID,
  scopes: ['profile', 'email'],
  permissions: ['public_profile', 'email', 'gender', 'location', 'birthday'],
  expoClientId: BUNDLE_ID
}

export const AuthProvider = ({ children }) => {
  const login = Google.useAuthRequest(config)
  console.log('login', login)
  const signInWithGoogle = async () => {
    login.GoogleAuthRequest.then(async logInResult => {
      if (logInResult.type === 'success') {
        console.log('logInResult', logInResult)
      }
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user: null,
        signInWithGoogle
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

```js
// LoginScreen.js
import { View, Text, Button } from 'react-native'
import React from 'react'
import useAuth from '../../hooks/useAuth'

const LoginScreen = () => {
  const { signInWithGoogle } = useAuth()

  return (
    <View>
      <Text>LoginScreen</Text>
      <Button title='login' onPress={signInWithGoogle} />
    </View>
  )
}

export default LoginScreen
```

## Optimizing using useMemo

## Building the Login Screen