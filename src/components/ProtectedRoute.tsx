import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '~/context/AuthContext'

interface Props {
  children: React.ReactNode
}
const ProtectedRoute = ({ children }: Props) => {
  const { user } = UserAuth()
  const navigate = useNavigate()
  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  }, [navigate, user])
  return <>{children}</>
}

export default ProtectedRoute
