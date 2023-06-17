import { CreateLocker, UpdateLocker } from '~/global/interface'
import useApi from './useApi'
import React from 'react'

const useLockerApi = () => {
  const callApi = useApi()
  const rootEndpoint = 'lockers'

  const getLockers = React.useCallback(
    async (lockerId: string) => {
      const endpoint = `/${rootEndpoint}/${lockerId}`
      try {
        const response = await callApi('get', endpoint)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  const deleteLocker = React.useCallback(
    async (lockerId: string) => {
      const endpoint = `/${rootEndpoint}/${lockerId}`
      try {
        const response = await callApi('delete', endpoint)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  const getLockerInRoom = React.useCallback(
    async (roomId: string) => {
      const endpoint = `/${rootEndpoint}?roomId=${roomId}`
      try {
        const response = await callApi('get', endpoint)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  const createLocker = React.useCallback(
    async (data: CreateLocker) => {
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

  const updateLocker = React.useCallback(
    async (data: UpdateLocker) => {
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

  return { getLockers, deleteLocker, getLockerInRoom, createLocker, updateLocker }
}

export default useLockerApi
