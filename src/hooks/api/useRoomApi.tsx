import { CreateRoom, UpdateRoom } from '~/global/interface'
import useApi from './useApi'
import React from 'react'

const useRoomApi = () => {
  const callApi = useApi()
  const rootEndpoint = 'rooms'

  const getRooms = React.useCallback(
    async (roomId: string) => {
      const endpoint = `/${rootEndpoint}/${roomId}`
      try {
        const response = await callApi('get', endpoint)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  const deleteRoom = React.useCallback(
    async (roomId: string) => {
      const endpoint = `/${rootEndpoint}/${roomId}`
      try {
        const response = await callApi('delete', endpoint)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  const getRoomsInDepartment = React.useCallback(
    async (departmentId: string) => {
      const endpoint = `/${rootEndpoint}?departmentId=${departmentId}`
      try {
        const response = await callApi('get', endpoint)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  const createRoom = React.useCallback(
    async (data: CreateRoom) => {
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

  const updateRoom = React.useCallback(
    async (data: UpdateRoom) => {
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

  return { getRooms, deleteRoom, getRoomsInDepartment, createRoom, updateRoom }
}

export default useRoomApi
