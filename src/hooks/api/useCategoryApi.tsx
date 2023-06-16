import { Categories, UpdateCategories } from '~/global/interface'
import useApi from './useApi'

const useCategoryApi = () => {
  const callApi = useApi()
  const rootEndpoint = 'categories'

  const getCategories = async (departmentId: string) => {
    const endpoint = `/${rootEndpoint}?departmentId=${departmentId}`
    try {
      const response = await callApi('get', endpoint)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  const createCategory = async (data: Categories) => {
    const endpoint = `/${rootEndpoint}`
    try {
      const response = await callApi('post', endpoint, {}, {}, data)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  const updateCategory = async (data: UpdateCategories) => {
    const endpoint = `/${rootEndpoint}/`
    try {
      const response = await callApi('put', endpoint, {}, {}, data)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  return { getCategories }
}

export default useCategoryApi
