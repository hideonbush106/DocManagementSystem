import { Fragment, useEffect, useState } from 'react'

interface Props {
  children: () => JSX.Element
}

const PrivateRoute = (props: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const userAcccessToken = localStorage.getItem('userAccessToken')

  useEffect(() => {
    if (userAcccessToken) {
      setIsLoggedIn(true)
    }
  }, [isLoggedIn, userAcccessToken])

  return <Fragment>{props.children()}</Fragment>
}

export default PrivateRoute
