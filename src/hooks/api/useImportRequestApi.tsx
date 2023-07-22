import React from 'react'
import useApi from './useApi'
import { ImportRequest, Reject, VerifiedRequset } from '~/global/interface'

const useImportRequestApi = () => {
  const callApi = useApi()
  const rootEndpoint = 'import-requests'

  const getImportRequestsAll = React.useCallback(
    async (status?: string, createdBy?: string, documentId?: string, take?: number, page?: number) => {
      let endpoint = `/${rootEndpoint}`
      if (page) endpoint += `?page=${page}`
      if (status) endpoint += `&status=${status}`
      if (createdBy) endpoint += `&createdBy=${createdBy}`
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

  const createImportRequest = React.useCallback(
    async (data: ImportRequest) => {
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

  const getImportRequestsOwn = React.useCallback(
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

  const getImportRequest = React.useCallback(
    async (importRequestId: string) => {
      const endpoint = `/${rootEndpoint}/${importRequestId}`
      try {
        const response = await callApi('get', endpoint)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  const acceptImportRequest = React.useCallback(
    async (importRequestId: string) => {
      const endpoint = `/${rootEndpoint}/accept/${importRequestId}`
      try {
        const response = await callApi('post', endpoint)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  const rejectImportRequest = React.useCallback(
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

  const cancelImportRequest = React.useCallback(
    async (importRequestId: string) => {
      const endpoint = `/${rootEndpoint}/cancel/${importRequestId}`
      try {
        const response = await callApi('post', endpoint)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  const verifyImportRequest = React.useCallback(
    async (data: VerifiedRequset) => {
      const endpoint = `/${rootEndpoint}/verify`
      try {
        const response = await callApi('post', endpoint, {}, {}, data)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  return {
    getImportRequestsAll,
    createImportRequest,
    getImportRequestsOwn,
    getImportRequest,
    acceptImportRequest,
    rejectImportRequest,
    cancelImportRequest,
    verifyImportRequest
  }
}

export default useImportRequestApi
