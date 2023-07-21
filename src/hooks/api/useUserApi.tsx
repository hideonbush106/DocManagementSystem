import React from 'react'
import useApi from './useApi'
import { CreateUser, UpdateUser } from '~/global/interface'

const useUserApi = () => {
  const callApi = useApi()
  const rootEndpoint = 'users'

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

  const getUserCount = React.useCallback(async () => {
    const endpoint = `/${rootEndpoint}/count`
    try {
      const response = await callApi('get', endpoint)
      return response
    } catch (error) {
      console.log(error)
    }
  }, [callApi])

  const getAllUsers = React.useCallback(
    async (departmentId: string | null = null) => {
      let endpoint = `/${rootEndpoint}/list`
      if (departmentId !== null) {
        endpoint += `?departmentId=${departmentId}`
      }
      try {
        const response = await callApi('get', endpoint)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  const createUser = React.useCallback(
    async (data: CreateUser) => {
      const endpoint = `/${rootEndpoint}`
      try {
        const response = await callApi('post', endpoint, {}, {}, data)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  const updateUser = React.useCallback(
    async (data: UpdateUser) => {
      const endpoint = `/${rootEndpoint}`
      try {
        const response = await callApi('put', endpoint, {}, {}, data)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  const disableUser = React.useCallback(
    async (userId: string) => {
      const endpoint = `/${rootEndpoint}/disable/${userId}`
      try {
        const response = await callApi('delete', endpoint)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  return { getUserLogin, getUserOwn, getUserProfile, getUserCount, getAllUsers, createUser, updateUser, disableUser }
}

export default useUserApi
