import { signInWithPopup, signOut, User, UserCredential } from 'firebase/auth'
import React, { ReactNode, useEffect } from 'react'
import { auth, provider } from '~/global/firebase'
import { notifyError } from '~/global/toastify'
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
  const [user, setUser] = React.useState<null | User>(null)
  const login = async () => {
    try {
      const result: UserCredential = await signInWithPopup(auth, provider)
      // const credential = GoogleAuthProvider.credentialFromResult(result)
      // if (credential === null) {
      //   throw new Error('credential is null')
      // }
      result.user?.getIdToken().then((token) => localStorage.setItem('userAccessToken', JSON.stringify(token)))
      window.location.href = '/welcome'
    } catch (error) {
      notifyError('Login failed')
      console.log(error)
    }
  }

  const logout = async () => {
    localStorage.removeItem('userAccessToken')
    try {
      await signOut(auth)
      window.location.href = '/'
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // const date = Date.now() / 1000
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log(
        'user',
        user?.getIdToken().then((token) => console.log(token))
      )
      setUser(user)
      // user?.getIdTokenResult().then((result) => {
      //   if (!(Date.parse(result.expirationTime) < date)) {
      //     user?.getIdTokenResult(true)
      //   }
      // })
      return () => unsubscribe()
    })
  }, [user])

  return <UserContext.Provider value={{ login, logout, user }}>{children}</UserContext.Provider>
}

export default AuthContext
export const UserAuth = () => {
  return React.useContext(UserContext)
}
