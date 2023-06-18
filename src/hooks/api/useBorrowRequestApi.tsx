import { BorrowRequest } from '~/global/interface'
import useApi from './useApi'
import React from 'react'

const useBorrowRequestApi = () => {
  const callApi = useApi()
  const rootEndpoint = 'borrow-requests'

  const getBorrowRequests = React.useCallback(
    async (borrowRequestId: string) => {
      const endpoint = `/${rootEndpoint}/${borrowRequestId}`
      try {
        const response = await callApi('get', endpoint)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  const getBorrowRequestsAll = React.useCallback(
    async (documentId: string) => {
      const endpoint = `/${rootEndpoint}?documentId=${documentId}`
      try {
        const response = await callApi('get', endpoint)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  const createBorrowRequest = React.useCallback(
    async (data: BorrowRequest) => {
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

  const getOwnBorrowRequests = React.useCallback(async () => {
    const endpoint = `/${rootEndpoint}/own`
    try {
      const response = await callApi('get', endpoint)
      return response
    } catch (error) {
      console.log(error)
    }
  }, [callApi])

  const acceptBorrowRequest = React.useCallback(
    async (borrowRequestId: string) => {
      const endpoint = `/${rootEndpoint}/accept/${borrowRequestId}/`
      try {
        const response = await callApi('post', endpoint)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  const rejectBorrowRequest = React.useCallback(async () => {
    const endpoint = `/${rootEndpoint}/reject`
    try {
      const response = await callApi('post', endpoint)
      return response
    } catch (error) {
      console.log(error)
    }
  }, [callApi])

  const cancelBorrowRequest = React.useCallback(
    async (borrowRequestId: string) => {
      const endpoint = `/${rootEndpoint}/cancel/${borrowRequestId}`
      try {
        const response = await callApi('post', endpoint)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

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
