import { signInWithPopup, signOut } from 'firebase/auth'
import React, { ReactNode } from 'react'
import { auth, provider } from '~/global/firebase'
import { UserCredential } from 'firebase/auth'
const UserContext = React.createContext({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  login: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  logout: () => {}
})

interface Props {
  children: ReactNode
}

const AuthContext = ({ children }: Props) => {
  const login = async () => {
    try {
      const result: UserCredential = await signInWithPopup(auth, provider)
      console.log(result)
      localStorage.setItem('user', JSON.stringify(result.user.accessToken))
    } catch (error) {
      console.log(error)
    }
  }

  const logout = () => {
    localStorage.removeItem('user')
    return signOut(auth)
  }

  return <UserContext.Provider value={{ login, logout }}>{children}</UserContext.Provider>
}

export default AuthContext
export const UserAuth = () => {
  return React.useContext(UserContext)
}
