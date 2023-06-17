import { CreateLocker, UpdateLocker } from '~/global/interface'
import useApi from './useApi'

const useLockerApi = () => {
  const callApi = useApi()
  const rootEndpoint = 'lockers'

  const getLockers = async (lockerId: string) => {
    const endpoint = `/${rootEndpoint}/${lockerId}`
    try {
      const response = await callApi('get', endpoint)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  const deleteLocker = async (lockerId: string) => {
    const endpoint = `/${rootEndpoint}/${lockerId}`
    try {
      const response = await callApi('delete', endpoint)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  const getLockerInRoom = async (roomId: string) => {
    const endpoint = `/${rootEndpoint}?roomId=${roomId}`
    try {
      const response = await callApi('get', endpoint)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  const createLocker = async (data: CreateLocker) => {
    const endpoint = `/${rootEndpoint}`
    try {
      const response = await callApi('post', endpoint, {}, {}, data)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  const updateLocker = async (data: UpdateLocker) => {
    const endpoint = `/${rootEndpoint}`
    try {
      const response = await callApi('put', endpoint, {}, {}, data)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  return { getLockers, deleteLocker, getLockerInRoom, createLocker, updateLocker }
}

export default useLockerApi
