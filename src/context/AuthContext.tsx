import { GoogleAuthProvider, signInWithPopup, signOut, User, UserCredential } from 'firebase/auth'
import React, { ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, provider } from '~/global/firebase'
import { notifyError, notifySuccess } from '~/global/toastify'
const UserContext = React.createContext({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  login: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  logout: () => {},
  user: null as null | User
})

interface Props {
  children: ReactNode
}

const AuthContext = ({ children }: Props) => {
  const navigate = useNavigate()
  const [user, setUser] = React.useState<null | User>(null)
  const login = async () => {
    try {
      const result: UserCredential = await signInWithPopup(auth, provider)
      const credential = GoogleAuthProvider.credentialFromResult(result)
      if (credential === null) {
        throw new Error('credential is null')
      }
      const token = credential.idToken
      localStorage.setItem('userAccessToken', JSON.stringify(token))
      navigate('system/welcome') // ! TODO: change this to the correct route
      notifySuccess('Login success')
    } catch (error) {
      notifyError('Login failed')
      console.log(error)
    }
  }

  const logout = () => {
    localStorage.removeItem('userAccessToken')
    try {
      signOut(auth)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const date = Date.now()
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
      user?.getIdTokenResult().then((result) => console.log(Date.parse(result.expirationTime) - date))
      // user?.getIdTokenResult(true)

      return () => unsubscribe()
    })
  }, [])

  return <UserContext.Provider value={{ login, logout, user }}>{children}</UserContext.Provider>
}

export default AuthContext
export const UserAuth = () => {
  return React.useContext(UserContext)
}