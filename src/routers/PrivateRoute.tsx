import { Fragment, useEffect } from 'react'
import { useNavigate } from 'react-router'

interface Props {
  children: () => JSX.Element
}

const PrivateRoute = (props: Props) => {
  const navigate = useNavigate()
  const isLogin = localStorage.getItem('isLogin')
  useEffect(() => {
    console.log(isLogin)
    if (!isLogin) {
      navigate('/')
    }
  }, [navigate, isLogin])

  return <Fragment>{props.children()}</Fragment>
}

export default PrivateRoute
