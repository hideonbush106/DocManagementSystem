import useApi from './useApi'

const useDocumentsTreeApi = () => {
  const callApi = useApi()

  const getDocumentsTree = async () => {
    const endpoint = `/trees`
    try {
      const response = await callApi('get', endpoint)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  return { getDocumentsTree }
}

export default useDocumentsTreeApi
