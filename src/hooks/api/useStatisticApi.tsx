import useApi from './useApi'
import React from 'react'

const useStatisticApi = () => {
  const rootEndpoint = 'statistics'
  const callApi = useApi()

  const getStatistic = React.useCallback(
    async (chart: string) => {
      const endpoint = `/${rootEndpoint}/${chart}`
      try {
        const response = await callApi('get', endpoint)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  return { getStatistic }
}

export default useStatisticApi
