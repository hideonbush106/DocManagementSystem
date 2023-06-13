import { AxiosError } from 'axios'
import { FirebaseError } from 'firebase/app'
import { signInWithPopup, signOut, User } from 'firebase/auth'
import React, { ReactNode, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUserLogin } from '~/global/apiendpoint'
import { auth, provider } from '~/global/firebase'
import { notifyError } from '~/global/toastify'

export type AuthContextType = {
  user: User | null
  loading: boolean
  login: () => void
  logout: () => void
}

export const AuthContext = React.createContext<AuthContextType | null>(null)

interface Props {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = React.useState<User | null>(null)
  const [idToken, setIdToken] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(true)
  const navigate = useNavigate()

  const logout = useCallback(async () => {
    localStorage.clear()
    try {
      await signOut(auth)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }, [navigate])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setLoading(true)
      // let timeout

      if (user) {
        try {
          // const expireTime = localStorage.getItem('expireTime')
          // if (expireTime) {
          //   const expiresIn = Date.parse(expireTime) - Date.now()
          //   if (expiresIn > 0) {
          //     timeout = setTimeout(() => {
          //       user.getIdTokenResult()
          //     }, expiresIn)
          //   }
          // }
          //check account in database
          const IdTokenResult = await user.getIdTokenResult()

          const response = await getUserLogin(IdTokenResult.token)
          if (response) {
            localStorage.setItem('expireTime', IdTokenResult.expirationTime)
            setUser(user)
            setIdToken(IdTokenResult.token)
            navigate('/dashboard')
          }
        } catch (error) {
          console.log(error)
          if (error instanceof AxiosError) {
            if (error.response?.status === 403 || error.response?.status === 401) {
              notifyError('Unauthorized account')
              logout()
            }
          }
        }
      } else {
        setUser(user)
      }
      setLoading(false)
    })
    return () => unsubscribe()
  }, [navigate, logout])

  // useEffect(() => {})

  const login = async () => {
    try {
      await signInWithPopup(auth, provider)
    } catch (error) {
      console.log(error)
      if (error instanceof FirebaseError) {
        if (error.code !== 'auth/popup-closed-by-user' && error.code !== 'auth/cancelled-popup-request')
          notifyError('Login failed')
      }
    }
  }

  const value = { user, idToken, loading, login, logout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
