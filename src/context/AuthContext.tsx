import { AxiosError } from 'axios'
import { FirebaseError } from 'firebase/app'
import { signInWithPopup, signOut, User } from 'firebase/auth'
import React, { ReactNode, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { auth, provider } from '~/global/firebase'
import { notifyError, notifySuccess } from '~/global/toastify'
import { get } from '~/utils/apicaller'

interface UserInfo {
  id: string
  code: string
  name: string
  email: string
  phone: string
  photoUrl: string | null
  role: string
  department: string
}

export type AuthContextType = {
  user: UserInfo | null
  loading: boolean
  login: () => Promise<void>
  logout: () => Promise<void>
  accessToken: string | null
  refreshAccessToken: () => Promise<void>
}

export const AuthContext = React.createContext<AuthContextType | null>(null)

interface Props {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = React.useState<User | null>(null)
  const [userInfo, setUserInfo] = React.useState<UserInfo | null>(null)
  const [idToken, setIdToken] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  const handleError = async (user: User, error: unknown) => {
    if (error instanceof AxiosError) {
      console.log(error)
      const errorDetails = error.response?.data.details
      switch (errorDetails) {
        case 'Access denied': {
          await logout()
          notifyError('Account is not allowed to access the system')
          break
        }
        case 'Token revoked': {
          await logout()
          notifyError('Session time out. Please login again')
          break
        }
        case 'Token expired': {
          const newToken = await user.getIdToken()
          setIdToken(newToken)
          break
        }
        default:
          notifyError('Something went wrong')
      }
    }
  }

  const sendUserActivity = async (user: User, token: string): Promise<boolean> => {
    // check account in database
    try {
      await get('/users/login', {}, { Authentication: token, accept: 'application/json' })
      return true
    } catch (error) {
      console.log(error)
      handleError(user, error)
      return false
    }
  }

  const getUserInfo = async (user: User, token: string): Promise<UserInfo | null> => {
    try {
      const { data } = await get('/users/own', {}, { Authentication: token, accept: 'application/json' })
      return {
        id: data.id,
        code: data.code,
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        photoUrl: user.photoURL,
        role: data.role.name,
        department: data.department.name
      }
    } catch (error) {
      console.log(error)
      handleError(user, error)
      return null
    }
  }

  const login = async () => {
    try {
      const userCredential = await signInWithPopup(auth, provider)
      setLoading(true)
      const token = await userCredential.user.getIdToken()
      const info = await getUserInfo(userCredential.user, token)
      console.log(token)
      if (info) {
        setUser(userCredential.user)
        setUserInfo(info)
        setIdToken(token)
        notifySuccess('Login successfully')
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
      setUserInfo(null)
      setIdToken(null)
    } catch (error) {
      console.log(error)
    }
  }

  const refreshAccessToken = async () => {
    if (user) {
      const newIdToken = await user.getIdToken(true)
      setIdToken(newIdToken)
    }
  }

  // get user state when app start
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken()
        const info = await getUserInfo(user, token)
        if (info) {
          setUserInfo(info)
          setUser(user)
          setIdToken(token)
        }
      }
      setLoading(false)
    })
    unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // refresh access token before expire
  useEffect(() => {
    if (!loading && user) {
      let idTimeout: NodeJS.Timeout
      user.getIdTokenResult().then(({ expirationTime }) => {
        const expireIn = Date.parse(expirationTime) - Date.now() - 5 * 60 * 1000 // 5 minutes before expire
        idTimeout = setTimeout(async () => {
          await refreshAccessToken()
        }, expireIn)
      })
      return () => clearInterval(idTimeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, idToken])

  // redirect to dashboard if user is logged in
  useEffect(() => {
    if (!loading) !user && navigate('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, user])

  // send user activity when route change
  useEffect(() => {
    if (!loading && user && idToken) sendUserActivity(user, idToken)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  const value = {
    user: userInfo,
    loading,
    login,
    logout,
    accessToken: idToken,
    refreshAccessToken
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
