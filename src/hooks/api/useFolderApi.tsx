import { CreateFolder, UpdateFolder } from '~/global/interface'
import useApi from './useApi'
import React from 'react'

const useFolderApi = () => {
  const callApi = useApi()
  const rootEndpoint = 'folders'

  const getFolders = React.useCallback(
    async (folderId: string) => {
      const endpoint = `/${rootEndpoint}/${folderId}`
      try {
        const response = await callApi('get', endpoint)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  const deleteFolder = React.useCallback(
    async (folderId: string) => {
      const endpoint = `/${rootEndpoint}/${folderId}`
      try {
        const response = await callApi('delete', endpoint)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  const folderQRcode = React.useCallback(
    async (folderId: string) => {
      const endpoint = `/${rootEndpoint}/barcode/${folderId}`
      try {
        const response = await callApi('get', endpoint)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  const getFoldersInLocker = React.useCallback(
    async (lockerId: string) => {
      const endpoint = `/${rootEndpoint}?lockerId=${lockerId}`
      try {
        const response = await callApi('get', endpoint)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  const createFolder = React.useCallback(
    async (data: CreateFolder) => {
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

  const updateFolder = React.useCallback(
    async (data: UpdateFolder) => {
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

  return { getFolders, deleteFolder, folderQRcode, getFoldersInLocker, createFolder, updateFolder }
}

export default useFolderApi
