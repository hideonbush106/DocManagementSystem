import useApi from './useApi'

const useDocumentApi = () => {
  const callApi = useApi()

  const getDocumentsInFolder = async (folderId: string) => {
    const endpoint = `/documents?folderId=${folderId}`
    try {
      const response = await callApi('get', endpoint)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  return { getDocumentsInFolder }
}

export default useDocumentApi
