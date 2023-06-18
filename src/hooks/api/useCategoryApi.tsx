import { Categories, UpdateCategories } from '~/global/interface'
import useApi from './useApi'
import React from 'react'
//TODO: waiting for back-end document api :)
const useCategoryApi = () => {
  const callApi = useApi()
  const rootEndpoint = 'categories'

  const getCategories = React.useCallback(
    async (departmentId: string) => {
      const endpoint = `/${rootEndpoint}?departmentId=${departmentId}`
      try {
        const response = await callApi('get', endpoint)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  const createCategory = React.useCallback(
    async (data: Categories) => {
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

  const updateCategory = React.useCallback(
    async (data: UpdateCategories) => {
      const endpoint = `/${rootEndpoint}/`
      try {
        const response = await callApi('put', endpoint, {}, {}, data)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  return { getCategories, createCategory, updateCategory }
}

export default useCategoryApi
