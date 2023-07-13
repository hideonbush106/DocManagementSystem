import React from 'react'
import useApi from './useApi'

const useStatisticApi = () => {
  const callApi = useApi()
  const rootEndpoint = 'statistics'

  const getImportStatistic = React.useCallback(async () => {
    const endpoint = `/${rootEndpoint}/import`
    try {
      const response = await callApi('get', endpoint)
      return response
    } catch (error) {
      console.log(error)
    }
  }, [callApi])

  const getBorrowStatistic = React.useCallback(async () => {
    const endpoint = `/${rootEndpoint}/borrow`
    try {
      const response = await callApi('get', endpoint)
      return response
    } catch (error) {
      console.log(error)
    }
  }, [callApi])

  return { getImportStatistic, getBorrowStatistic }
}

export default useStatisticApi
