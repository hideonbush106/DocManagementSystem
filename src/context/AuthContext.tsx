// react
import React, { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
// firebase
import { auth, provider } from '~/global/firebase'
import { FirebaseError } from 'firebase/app'
import { signInWithPopup, signOut, User } from 'firebase/auth'
// components
import Loading from '~/components/loading/Loading'
// function
import { notifyError, notifySuccess } from '~/global/toastify'
import { get } from '~/utils/apicaller'
// class
import { AxiosError } from 'axios'

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
  user: UserInfo | undefined
  login: () => Promise<void>
  logout: () => Promise<boolean>
}

export const AuthContext = React.createContext<AuthContextType | null>(null)

interface Props {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = React.useState<UserInfo | undefined>()
  const [firebaseUser, setFirebaseUser] = React.useState<User | null>(null)
  const [loading, setLoading] = React.useState(true)
  const navigate = useNavigate()

  const logout = React.useCallback(async () => {
    try {
      await signOut(auth)
      localStorage.clear()
      setUser(undefined)
      setFirebaseUser(null)
      return true
    } catch (error) {
      console.log(error)
      notifyError('Fail to logout')
      return false
    }
  }, [])

  const refreshToken = React.useCallback(async () => {
    if (firebaseUser) {
      try {
        const token = await firebaseUser.getIdToken(true)
        localStorage.setItem('idToken', token)
      } catch (error) {
        console.log(error)
      }
    }
  }, [firebaseUser])

  const handleError = React.useCallback(
    async (error: unknown) => {
      let message = ''
      if (error instanceof AxiosError) {
        const errorDetails = error.response?.data.details
        switch (errorDetails) {
          case 'Access denied': {
            const status = await logout()
            if (status) message = 'Account is not allowed to access the system'
            break
          }
          case 'Session expired': {
            const status = await logout()
            if (status) message = 'Session expired. Please login again'
            break
          }
          case 'Invalid token': {
            await logout()
            break
          }
          default:
            message = 'Something went wrong'
        }
      }
      if (message) {
        notifyError(message)
      }
    },
    [logout]
  )

  const getUserInfo = React.useCallback(async () => {
    try {
      const token = localStorage.getItem('idToken')
      const { data } = await get('/users/own', {}, { Authentication: token, accept: 'application/json' })
      return {
        id: data.id,
        code: data.code,
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        photoUrl: data.photoURL,
        role: data.role.name,
        department: data.department.name
      }
    } catch (error) {
      console.log(error)
      handleError(error)
    }
  }, [handleError])

  const login = React.useCallback(async () => {
    try {
      const userCredential = await signInWithPopup(auth, provider)
      const token = await userCredential.user.getIdToken()
      localStorage.setItem('idToken', token)
      setLoading(true)
      const login = await get('/users/login', {}, { Authentication: token, accept: 'application/json' })
      if (login) {
        const userInfo = await getUserInfo()
        setUser(userInfo)
        setFirebaseUser(userCredential.user)
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
  }, [getUserInfo])

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userInfo = await getUserInfo()
        if (userInfo) {
          setUser(userInfo)
          setFirebaseUser(user)
        }
      }
      setLoading(false)
    })
    unsubscribe()
  }, [getUserInfo])

  React.useEffect(() => {
    if (!loading && !user) navigate('/')
  }, [loading, navigate, user])

  // refresh access token before expire
  React.useEffect(() => {
    if (!loading && firebaseUser) {
      let idTimeout: NodeJS.Timeout
      firebaseUser.getIdTokenResult().then(({ expirationTime }) => {
        const expireIn = Date.parse(expirationTime) - Date.now() - 5 * 60 * 1000 // 5 minutes before expire
        idTimeout = setTimeout(async () => {
          await refreshToken()
        }, expireIn)
      })
      return () => clearInterval(idTimeout)
    }
  }, [firebaseUser, loading, refreshToken])

  const value: AuthContextType = {
    user: user,
    login,
    logout
  }

  return !loading ? <AuthContext.Provider value={value}>{children}</AuthContext.Provider> : <Loading />
}

export default AuthProvider
