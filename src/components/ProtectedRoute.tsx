import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  children: React.ReactNode
}
const ProtectedRoute = ({ children }: Props) => {
  const navigate = useNavigate()
  useEffect(() => {
    const userAccessToken = localStorage.getItem('userAccessToken')
    if (!userAccessToken) {
      navigate('/')
    }
  }, [navigate])
  return <>{children}</>
}

export default ProtectedRoute
