import React from 'react'
import useApi from './useApi'

const useMedia = () => {
  const callApi = useApi()
  const rootEndpoint = 'media'

  const getMedia = React.useCallback(
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

  const checkMedia = React.useCallback(
    async (documentId: string) => {
      const endpoint = `/${rootEndpoint}/check/${documentId}`
      try {
        const response = await callApi('get', endpoint)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  return { getMedia, checkMedia }
}

export default useMedia
