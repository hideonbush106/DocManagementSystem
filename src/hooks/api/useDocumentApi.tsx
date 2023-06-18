import { ConfirmDocument, CreateDocument } from '~/global/interface'
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
    async (folderId: string) => {
      const endpoint = `/${rootEndpoint}?folderId=${folderId}`
      try {
        const response = await callApi('get', endpoint)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )
  //Todo: fix this
  const uploadDocumentPdf = React.useCallback(
    async (documentId: string, data: CreateDocument, token: string) => {
      const endpoint = `/${rootEndpoint}/upload/${documentId}`
      const headers = { Authentication: token, 'Content-Type': 'multipart/form-data' }

      try {
        const response = await callApi('post', endpoint, headers, {}, data)
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

  return { getDocumentsInFolder, getDocument, getDocumentBarcode, createDocument, uploadDocumentPdf, confirmDocument }
}

export default useDocumentApi
