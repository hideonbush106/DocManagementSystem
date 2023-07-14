import { ConfirmDocument, CreateDocument, UpdateDocument } from '~/global/interface'
import useApi from './useApi'
import React from 'react'

const useDocumentApi = () => {
  const callApi = useApi()
  const rootEndpoint = 'documents'

  const getDocument = React.useCallback(
    async (documentId: string) => {
      const endpoint = `/${rootEndpoint}/${documentId}`
      try {
        const response = await callApi('get', endpoint)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  const getAllDocuments = React.useCallback(
    async (take: number, page: number, keyword?: string, folderId?: string) => {
      let endpoint = `/${rootEndpoint}?take=${take}&page=${page + 1}`
      if (keyword) endpoint += `&keyword=${keyword}`
      if (folderId) endpoint += `&folderId=${folderId}`
      try {
        const response = await callApi('get', endpoint)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  const getDocumentBarcode = React.useCallback(
    async (documentId: string) => {
      const endpoint = `/${rootEndpoint}/barcode/${documentId}`
      try {
        const response = await callApi('get', endpoint)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  const getDocumentsInFolder = React.useCallback(
    async (folderId: string, skipPagination = 0) => {
      const endpoint = `/${rootEndpoint}`
      const params = {
        folderId: folderId,
        skipPagination: skipPagination
      }
      try {
        const response = await callApi('get', endpoint, {}, params)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  const findDocument = React.useCallback(
    async (keyword: string, skipPagination = 0) => {
      const endpoint = `/${rootEndpoint}`
      const params = {
        keyword: keyword,
        skipPagination: skipPagination
      }

      try {
        const response = await callApi('get', endpoint, {}, params)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )
  //Todo: fix this
  const uploadDocumentPdf = React.useCallback(
    async (documentId: string, file: File[]) => {
      const endpoint = `/${rootEndpoint}/upload/${documentId}`
      const formData = new FormData()
      formData.append('file', file[0], file[0].name)
      const header = {
        'Content-Type': 'multipart/form-data'
      }
      try {
        const response = await callApi('post', endpoint, header, {}, formData)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  const confirmDocument = React.useCallback(
    async (data: ConfirmDocument) => {
      const endpoint = `/${rootEndpoint}/confirm/`
      try {
        const response = await callApi('post', endpoint, {}, {}, data)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  const createDocument = React.useCallback(
    async (data: CreateDocument) => {
      const endpoint = `/${rootEndpoint}/`
      try {
        const response = await callApi('post', endpoint, {}, {}, data)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  const updateDocument = React.useCallback(
    async (data: UpdateDocument) => {
      const endpoint = `/${rootEndpoint}/`
      try {
        const response = await callApi('put', endpoint, {}, {}, data)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  const getPendingDocuments = React.useCallback(
    async (take: number, page: number, keyword?: string, folderId?: string) => {
      let endpoint = `/${rootEndpoint}/pending?take=${take}&page=${page + 1}`
      if (keyword) endpoint += `&keyword=${keyword}`
      if (folderId) endpoint += `&folderId=${folderId}`
      try {
        const response = await callApi('get', endpoint)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  const getDocumentCount = React.useCallback(async () => {
    const endpoint = `/${rootEndpoint}/count`
    try {
      const response = await callApi('get', endpoint)
      return response
    } catch (error) {
      console.log(error)
    }
  }, [callApi])

  const checkReturnDocument = React.useCallback(
    async (documentId: string | null) => {
      const endpoint = `/${rootEndpoint}/check-return/`
      try {
        const response = await callApi('post', endpoint, {}, {}, { QRCode: documentId })
        return response
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  const returnDocument = React.useCallback(
    async (documentId: string | null) => {
      const endpoint = `/${rootEndpoint}/return/`
      try {
        const response = await callApi('post', endpoint, {}, {}, { QRCode: documentId })
        return response
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  return {
    getDocumentsInFolder,
    getDocument,
    getDocumentBarcode,
    findDocument,
    createDocument,
    updateDocument,
    uploadDocumentPdf,
    confirmDocument,
    getPendingDocuments,
    getDocumentCount,
    checkReturnDocument,
    returnDocument,
    getAllDocuments
  }
}

export default useDocumentApi
