// react
import React, { ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// firebase
import { auth, provider } from '~/global/firebase'
import { FirebaseError } from 'firebase/app'
import { signInWithPopup, signOut } from 'firebase/auth'
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
  departmentId: string
}

export type AuthContextType = {
  user: UserInfo | undefined
  idToken: string | null
  login: () => Promise<void>
  logout: () => Promise<void>
  refreshToken: () => Promise<void>
}

interface Props {
  children: ReactNode
}

const initialContext: AuthContextType = {
  user: {
    id: '',
    code: '',
    name: '',
    email: '',
    phone: '',
    photoUrl: '',
    role: '',
    department: '',
    departmentId: ''
  },
  idToken: null,
  login: async () => {
    return
  },
  logout: async () => {
    return
  },
  refreshToken: async () => {
    return
  }
}

export const AuthContext = React.createContext<AuthContextType>(initialContext)

const getUserInfo = async (token: string) => {
  const { data } = await get('/users/own', {}, { Authentication: token, accept: 'application/json' })

  return {
    id: data.id,
    code: data.code,
    name: `${data.firstName} ${data.lastName}`,
    email: data.email,
    phone: data.phone,
    photoUrl: data.photoURL,
    role: data.role.name,
    department: data.department.name,
    departmentId: data.department.id
  }
}

const AuthProvider = ({ children }: Props) => {
  const [idToken, setIdToken] = React.useState<string | null>(null)
  const [user, setUser] = React.useState<UserInfo | undefined>()
  const [loading, setLoading] = React.useState(true)

  const navigate = useNavigate()

  initialContext.logout = async () => {
    setLoading(true)
    try {
      await signOut(auth)
      await get('/users/logout', {}, { Authentication: idToken, accept: 'application/json' })
    } catch (error) {
      console.log(error)
    }
    setIdToken(null)
    setUser(undefined)
    setLoading(false)
  }

  initialContext.login = async () => {
    try {
      // sign in with google to get token
      const userCredential = await signInWithPopup(auth, provider)
      setLoading(true)
      initialContext.refreshToken = async () => {
        const token = await userCredential.user.getIdToken(true)
        setIdToken(token)
      }
      const token = await userCredential.user.getIdToken()
      console.log(token)
      // sign in with token to verify user and initialize new session
      await get('/users/login', {}, { Authentication: token, accept: 'application/json' })
      const userInfo = await getUserInfo(token)
      setIdToken(token)
      setUser(userInfo)
      notifySuccess('Login successfully')
    } catch (error) {
      console.log(error)
      if (error instanceof FirebaseError) {
        if (error.code !== 'auth/popup-closed-by-user' && error.code !== 'auth/cancelled-popup-request') {
          notifyError('Login failed')
          return
        }
      }
      if (error instanceof AxiosError && error.response?.data.details === 'Access denied') {
        notifyError('Account is not allowed to access the system')
        await signOut(auth)
      } else {
        notifyError('Login failed')
      }
    }
    setLoading(false)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          initialContext.refreshToken = async () => {
            const token = await user.getIdToken(true)
            setIdToken(token)
          }
          const token = await user.getIdToken()
          const userInfo = await getUserInfo(token)
          setIdToken(token)
          setUser(userInfo)
        } catch (error) {
          console.log(error)
          if (error instanceof AxiosError) {
            let message = ''
            const errorDetails = error.response?.data.details
            switch (errorDetails) {
              case 'Session expired': {
                break
              }
              case 'Access denied': {
                message = 'Account is not allowed to access the system'
                break
              }
              default:
                message = 'Something went wrong'
            }
            if (message !== '') notifyError(message)
            await signOut(auth)
          }
        }
      }
      setLoading(false)
    })
    unsubscribe()
  }, [])

  React.useEffect(() => {
    if (!loading && !idToken) navigate('/')
  }, [loading, navigate, idToken])

  initialContext.user = user
  initialContext.idToken = idToken

  return !loading ? <AuthContext.Provider value={initialContext}>{children}</AuthContext.Provider> : <Loading />
}

export default AuthProvider
