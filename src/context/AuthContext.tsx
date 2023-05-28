import { AxiosError } from 'axios'
import { signInWithPopup, signOut, User, UserCredential } from 'firebase/auth'
import React, { ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUserLogin } from '~/global/apiendpoint'
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
  const navigate = useNavigate()

  const login = async () => {
    try {
      const result: UserCredential = await signInWithPopup(auth, provider)
      //check account in database
      const idToken = await result.user.getIdToken()
      getUserLogin(idToken)
        .then(() => {
          navigate('/welcome')
          localStorage.setItem('isLogin', 'TRUE')
        })
        .catch((error: AxiosError) => {
          if (error.response?.status === 403 || error.response?.status === 401) {
            notifyError('Unauthorized account')
            navigate('/')
          }
        })
    } catch (error) {
      notifyError('Login failed')
      logout()
      console.log(error)
    }
  }

  const logout = async () => {
    try {
      localStorage.removeItem('isLogin')
      await signOut(auth)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
    })
    return () => unsubscribe()
  }, [])

  const value = { login, logout, user }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
