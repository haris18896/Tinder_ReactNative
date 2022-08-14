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
