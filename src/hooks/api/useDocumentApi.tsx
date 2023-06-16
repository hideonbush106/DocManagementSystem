import { ConfirmDocument, CreateDocument } from '~/global/interface'
import useApi from './useApi'

const useDocumentApi = () => {
  const callApi = useApi()
  const rootEndpoint = 'documents'

  const getDocument = async (documentId: string) => {
    const endpoint = `/${rootEndpoint}/${documentId}`
    try {
      const response = await callApi('get', endpoint)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  const getDocumentBarcode = async (documentId: string) => {
    const endpoint = `/${rootEndpoint}/barcode/${documentId}`
    try {
      const response = await callApi('get', endpoint)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  const getDocumentsInFolder = async (folderId: string) => {
    const endpoint = `/${rootEndpoint}?folderId=${folderId}`
    try {
      const response = await callApi('get', endpoint)
      return response
    } catch (error) {
      console.log(error)
    }
  }
  //Todo: fix this
  const uploadDocumentPdf = async (documentId: string, data: CreateDocument, token: string) => {
    const endpoint = `/${rootEndpoint}/upload/${documentId}`
    const headers = { Authentication: token, 'Content-Type': 'multipart/form-data' }

    try {
      const response = await callApi('post', endpoint, headers, {}, data)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  const confirmDocument = async (data: ConfirmDocument) => {
    const endpoint = `/${rootEndpoint}/confirm/`
    try {
      const response = await callApi('post', endpoint, {}, {}, data)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  const createDocument = async (data: CreateDocument) => {
    const endpoint = `/${rootEndpoint}/`
    try {
      const response = await callApi('post', endpoint, {}, {}, data)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  return { getDocumentsInFolder, getDocument, getDocumentBarcode, createDocument, uploadDocumentPdf, confirmDocument }
}

export default useDocumentApi
