import React from 'react'
import useApi from './useApi'

const useDocumentsTreeApi = () => {
  const callApi = useApi()

  const getDocumentsTree = React.useCallback(async () => {
    const endpoint = `/trees`
    try {
      const response = await callApi('get', endpoint)
      return response
    } catch (error) {
      console.log(error)
    }
  }, [callApi])

  return { getDocumentsTree }
}

export default useDocumentsTreeApi
