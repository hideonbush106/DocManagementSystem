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

  const getImportRequestStatistic = React.useCallback(
    async (year: number) => {
      const endpoint = `/${rootEndpoint}/status-import-request/${year}`
      try {
        const response = await callApi('get', endpoint)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )
  const getBorrowRequestStatistic = React.useCallback(
    async (year: number) => {
      const endpoint = `/${rootEndpoint}/status-borrow-request/${year}`
      try {
        const response = await callApi('get', endpoint)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  const getMonthlyRequestStatistic = React.useCallback(
    async (year: number) => {
      const endpoint = `/${rootEndpoint}/request-monthly-report/${year}`
      try {
        const response = await callApi('get', endpoint)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  return { getStatistic, getImportRequestStatistic, getBorrowRequestStatistic, getMonthlyRequestStatistic }
}

export default useStatisticApi
