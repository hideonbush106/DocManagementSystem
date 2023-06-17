import { CreateRoom, UpdateRoom } from '~/global/interface'
import useApi from './useApi'

const useRoomApi = () => {
  const callApi = useApi()
  const rootEndpoint = 'rooms'

  const getRooms = async (roomId: string) => {
    const endpoint = `/${rootEndpoint}/${roomId}`
    try {
      const response = await callApi('get', endpoint)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  const deleteRoom = async (roomId: string) => {
    const endpoint = `/${rootEndpoint}/${roomId}`
    try {
      const response = await callApi('delete', endpoint)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  const getRoomsInDepartment = async (departmentId: string) => {
    const endpoint = `/${rootEndpoint}?departmentId=${departmentId}`
    try {
      const response = await callApi('get', endpoint)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  const createRoom = async (data: CreateRoom) => {
    const endpoint = `/${rootEndpoint}`
    try {
      const response = await callApi('post', endpoint, {}, {}, data)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  const updateRoom = async (data: UpdateRoom) => {
    const endpoint = `/${rootEndpoint}`
    try {
      const response = await callApi('put', endpoint, {}, {}, data)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  return { getRooms, deleteRoom, getRoomsInDepartment, createRoom, updateRoom }
}

export default useRoomApi
