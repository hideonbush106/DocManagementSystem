import { AxiosError } from 'axios'
import { FirebaseError } from 'firebase/app'
import { signInWithPopup, signOut, User, UserCredential } from 'firebase/auth'
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
    setLoading(true)
    localStorage.clear()
    try {
      await signOut(auth)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }, [navigate])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log(user)
        const expireTime = localStorage.getItem('expireTime')
        if (expireTime && Date.parse(expireTime) > Date.now()) {
          const idTokenResult = await user.getIdTokenResult()
          setIdToken(idTokenResult.token)
        } else {
          console.log('out')
          await logout()
        }
      }
      setUser(user)
    })
    setLoading(false)
    return () => unsubscribe()
  }, [logout])

  const login = async () => {
    try {
      const result: UserCredential = await signInWithPopup(auth, provider)
      //check account in database
      const IdTokenResult = await result.user.getIdTokenResult()

      getUserLogin(IdTokenResult.token)
        .then(() => {
          localStorage.setItem('expireTime', IdTokenResult.expirationTime)
          setIdToken(IdTokenResult.token)
          navigate('/dashboard')
        })
        .catch((error: AxiosError) => {
          if (error.response?.status === 403 || error.response?.status === 401) {
            notifyError('Unauthorized account')
            logout()
          }
        })
    } catch (error) {
      if (
        error instanceof FirebaseError &&
        error.code !== 'auth/popup-closed-by-user' &&
        error.code !== 'auth/cancelled-popup-request'
      )
        notifyError('Login failed')
      console.log(error)
    }
  }

  const value = { user, idToken, loading, login, logout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
