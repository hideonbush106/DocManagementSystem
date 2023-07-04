import { BorrowRequest, Reject } from '~/global/interface'
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
  // ? API undone
  const getBorrowRequestsAll = React.useCallback(
    async (status?: string, documentId?: string, take?: number, page?: number) => {
      let endpoint = `/${rootEndpoint}`
      if (page) endpoint += `?page=${page}`
      if (status) endpoint += `&status=${status}`
      if (documentId) endpoint += `&documentId=${documentId}`
      if (take) endpoint += `&take=${take}`
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

  //For employee
  const getOwnBorrowRequests = React.useCallback(
    async (status?: string, documentId?: string, take?: number, page?: number) => {
      let endpoint = `/${rootEndpoint}/own`
      if (page) endpoint += `?page=${page}`
      if (status) endpoint += `&status=${status}`
      if (documentId) endpoint += `&documentId=${documentId}`
      if (take) endpoint += `&take=${take}`
      try {
        const response = await callApi('get', endpoint)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

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

  const rejectBorrowRequest = React.useCallback(
    async (data: Reject) => {
      const endpoint = `/${rootEndpoint}/reject`
      try {
        const response = await callApi('post', endpoint, {}, {}, data)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

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
