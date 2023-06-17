import { CreateFolder, UpdateFolder } from '~/global/interface'
import useApi from './useApi'

const useFolderApi = () => {
  const callApi = useApi()
  const rootEndpoint = 'folders'

  const getFolders = async (folderId: string) => {
    const endpoint = `/${rootEndpoint}/${folderId}`
    try {
      const response = await callApi('get', endpoint)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  const deleteFolder = async (folderId: string) => {
    const endpoint = `/${rootEndpoint}/${folderId}`
    try {
      const response = await callApi('delete', endpoint)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  const folderQRcode = async (folderId: string) => {
    const endpoint = `/${rootEndpoint}/barcode/${folderId}`
    try {
      const response = await callApi('get', endpoint)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  const getFoldersInLocker = async (lockerId: string) => {
    const endpoint = `/${rootEndpoint}?lockerId=${lockerId}`
    try {
      const response = await callApi('get', endpoint)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  const createFolder = async (data: CreateFolder) => {
    const endpoint = `/${rootEndpoint}`
    try {
      const response = await callApi('post', endpoint, {}, {}, data)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  const updateFolder = async (data: UpdateFolder) => {
    const endpoint = `/${rootEndpoint}`
    try {
      const response = await callApi('put', endpoint, {}, {}, data)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  return { getFolders, deleteFolder, folderQRcode, getFoldersInLocker, createFolder, updateFolder }
}

export default useFolderApi
