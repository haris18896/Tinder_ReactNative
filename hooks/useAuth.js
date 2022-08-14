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
  const signInWithGoogle = async () => {
    await Google.useAuthRequest(config).then(async logInResult => {
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
