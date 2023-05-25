import { GoogleAuthProvider, signInWithPopup, signOut, User, UserCredential } from 'firebase/auth'
import React, { ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, provider } from '~/global/firebase'
const UserContext = React.createContext({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  login: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  logout: () => {},
  user: undefined as undefined | User
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
      console.log(credential)
      if (credential === null) {
        throw new Error('credential is null')
      }
      const token = credential.idToken
      console.log(token)
      localStorage.setItem('userAccessToken', JSON.stringify(token))
      navigate('/welcome')
    } catch (error) {
      console.log(error)
    }
  }

  const logout = () => {
    localStorage.removeItem('userAccessToken')
    try {
      return signOut(auth)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })
    return () => unsubscribe()
  }, [user])

  return <UserContext.Provider value={{ login, logout, user }}>{children}</UserContext.Provider>
}

export default AuthContext
export const UserAuth = () => {
  return React.useContext(UserContext)
}
