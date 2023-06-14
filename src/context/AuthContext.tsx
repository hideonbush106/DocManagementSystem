import { FirebaseError } from 'firebase/app'
import { signInWithPopup, signOut, User } from 'firebase/auth'
import React, { ReactNode, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getUserLogin } from '~/global/apiendpoint'
import { auth, provider } from '~/global/firebase'
import { notifyError, notifySuccess } from '~/global/toastify'

interface UserInterface {
  name: string | null
  email: string | null
  phone: string | null
  photoUrl: string | null
  accessToken: string | null
}

export type AuthContextType = {
  user: UserInterface | null
  loading: boolean
  login: () => void
  logout: () => void
  refreshAccessToken: () => Promise<string | void>
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
  const location = useLocation()

  const validateUser = async (user: User, token: string): Promise<boolean> => {
    try {
      //check account in database
      await getUserLogin(token)
      return true
    } catch (error) {
      console.log(error)
      if (error instanceof Error) {
        if (error.message === 'Token expired') {
          const newToken = await user.getIdToken()
          setIdToken(newToken)
        } else {
          notifyError(error.message)
          logout()
        }
      }
      return false
    }
  }

  const login = async () => {
    try {
      const userCredential = await signInWithPopup(auth, provider)
      setLoading(true)
      const token = await userCredential.user.getIdToken()
      const isValidate = await validateUser(userCredential.user, token)
      if (isValidate) {
        notifySuccess('Login successfully')
        setUser(userCredential.user)
        setIdToken(token)
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      if (error instanceof FirebaseError) {
        if (error.code !== 'auth/popup-closed-by-user' && error.code !== 'auth/cancelled-popup-request')
          notifyError('Login failed')
      }
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      setUser(null)
      setIdToken(null)
    } catch (error) {
      console.log(error)
    }
  }

  const refreshAccessToken = async () => {
    if (user) {
      const newIdToken = await user.getIdToken(true)
      setIdToken(newIdToken)
      return newIdToken
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log((await user.getIdTokenResult()).expirationTime)
        const token = await user.getIdToken()
        const isValidate = await validateUser(user, token)
        if (isValidate) {
          setUser(user)
          setIdToken(token)
        }
      } else {
        navigate('/')
      }
      setLoading(false)
    })
    unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!loading && user && idToken) validateUser(user, idToken)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  useEffect(() => {
    if (!loading) user ? navigate('/dashboard') : navigate('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, user])

  const value = {
    user: user
      ? {
          name: user.displayName,
          email: user.email,
          phone: user.phoneNumber,
          photoUrl: user.photoURL,
          accessToken: idToken
        }
      : null,
    loading,
    login,
    logout,
    refreshAccessToken
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
