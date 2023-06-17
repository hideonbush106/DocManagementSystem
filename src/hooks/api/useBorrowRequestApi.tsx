import { BorrowRequest } from '~/global/interface'
import useApi from './useApi'

const useBorrowRequestApi = () => {
  const callApi = useApi()
  const rootEndpoint = 'borrow-requests'
  const getBorrowRequests = async (borrowRequestId: string) => {
    const endpoint = `/${rootEndpoint}/${borrowRequestId}`
    try {
      const response = await callApi('get', endpoint)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  const getBorrowRequestsAll = async (documentId: string) => {
    const endpoint = `/${rootEndpoint}?documentId=${documentId}`
    try {
      const response = await callApi('get', endpoint)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  const createBorrowRequest = async (data: BorrowRequest) => {
    const endpoint = `/${rootEndpoint}`
    try {
      const response = await callApi('post', endpoint, {}, {}, data)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  const getOwnBorrowRequests = async () => {
    const endpoint = `/${rootEndpoint}/own`
    try {
      const response = await callApi('get', endpoint)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  const acceptBorrowRequest = async (borrowRequestId: string) => {
    const endpoint = `/${rootEndpoint}/accept/${borrowRequestId}/`
    try {
      const response = await callApi('post', endpoint)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  const rejectBorrowRequest = async () => {
    const endpoint = `/${rootEndpoint}/reject`
    try {
      const response = await callApi('post', endpoint)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  const cancelBorrowRequest = async (borrowRequestId: string) => {
    const endpoint = `/${rootEndpoint}/cancel/${borrowRequestId}`
    try {
      const response = await callApi('post', endpoint)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  return {
    getBorrowRequests,
    getBorrowRequestsAll,
    createBorrowRequest,
    getOwnBorrowRequests,
    acceptBorrowRequest,
    rejectBorrowRequest,
    cancelBorrowRequest
  }
}

export default useBorrowRequestApi
