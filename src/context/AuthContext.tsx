import { signInWithPopup, signOut, User, UserCredential } from 'firebase/auth'
import React, { ReactNode, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { auth, provider } from '~/global/firebase'
import { notifyError } from '~/global/toastify'

export type AuthContextType = {
  user: User | null
  login: () => void
  logout: () => void
}

export const AuthContext = React.createContext<AuthContextType | null>(null)

interface Props {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = React.useState<null | User>(null)
  const location = useLocation()
  const login = async () => {
    try {
      const result: UserCredential = await signInWithPopup(auth, provider)
      const idToken = await result.user.getIdToken()
      localStorage.setItem('userAccessToken', JSON.stringify(idToken))
      const idTokenResult = await result.user.getIdTokenResult()
      const currentTime = Date.now()
      const expirationTime = Date.parse(idTokenResult.expirationTime)
      if (expirationTime < currentTime) {
        localStorage.removeItem('userAccessToken')
        logout()
      }
      window.location.href = '/welcome'
    } catch (error) {
      notifyError('Login failed')
      console.log(error)
    }
  }

  const logout = async () => {
    localStorage.removeItem('userAccessToken')
    try {
      await signOut(auth)
      window.location.href = '/'
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user)
      if (user) {
        const idTokenResult = await user.getIdTokenResult()
        const currentTime = Date.now()
        const expirationTime = Date.parse(idTokenResult.expirationTime)
        if (expirationTime < currentTime) {
          localStorage.removeItem('userAccessToken')
          logout()
        }
      }
      return () => unsubscribe()
    })
  }, [location])

  const value = { login, logout, user }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
