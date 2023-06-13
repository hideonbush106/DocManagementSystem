import { AxiosError } from 'axios'
import { FirebaseError } from 'firebase/app'
import { signInWithPopup, signOut, User } from 'firebase/auth'
import React, { ReactNode, useEffect } from 'react'
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

  const logout = async () => {
    try {
      await signOut(auth)
      localStorage.clear()
      setUser(null)
      setIdToken(null)
    } catch (error) {
      console.log(error)
    }
  }

  const validateUser = async (user: User) => {
    try {
      //check account in database
      const IdTokenResult = await user.getIdTokenResult()
      await getUserLogin(IdTokenResult.token)
      return IdTokenResult
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError) {
        if (error.response?.status === 403 || error.response?.status === 401) {
          notifyError('Unauthorized account')
          logout()
        }
      }
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setLoading(true)
      if (user) {
        console.log(user)
        const IdTokenResult = await validateUser(user)
        if (IdTokenResult) {
          localStorage.setItem('expireTime', IdTokenResult.expirationTime)
          setUser(user)
          setIdToken(IdTokenResult.token)
        }
      } else {
        localStorage.clear()
        setUser(user)
        setIdToken(null)
      }

      setLoading(false)
    })
    unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!loading) {
      if (user) {
        navigate('/dashboard')
      } else {
        navigate('/')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, user])

  // if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {

  // const expireTime = localStorage.getItem('expireTime')
  // if (!expireTime || Date.parse(expireTime) < Date.now()) {
  //   logout()
  // }

  // if (!loading && user) {
  //   const expireIn = Date.parse(expireTime) - Date.now()
  //   setTimeout(async () => {
  //     const IdTokenResult = await user.getIdTokenResult(true)
  //     localStorage.setItem('expireTime', IdTokenResult.expirationTime)
  //     setUser(user)
  //     setIdToken(IdTokenResult.token)
  //   }, 10 * 1000)
  // }

  const login = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      const IdTokenResult = await validateUser(result.user)
      if (IdTokenResult) {
        localStorage.setItem('expireTime', IdTokenResult.expirationTime)
        setUser(result.user)
        setIdToken(IdTokenResult.token)
      }
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
