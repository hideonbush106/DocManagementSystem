import React from 'react'
import useApi from './useApi'

const useUserApi = () => {
  const callApi = useApi()
  const rootEndpoint = 'user'

  const getUserLogin = React.useCallback(
    async (token: string) => {
      const endpoint = `/${rootEndpoint}/login`
      const headers = { Authentication: token }
      try {
        const response = await callApi('get', endpoint, headers)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  const getUserOwn = React.useCallback(async () => {
    const endpoint = `/${rootEndpoint}/own`
    try {
      const response = await callApi('get', endpoint)
      return response
    } catch (error) {
      console.log(error)
    }
  }, [callApi])

  const getUserProfile = React.useCallback(
    async (userId: string) => {
      const endpoint = `/${rootEndpoint}/profile/${userId}`
      try {
        const response = await callApi('get', endpoint)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  return { getUserLogin, getUserOwn, getUserProfile }
}

export default useUserApi
