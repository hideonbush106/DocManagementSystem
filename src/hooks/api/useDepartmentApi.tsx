import { CreateDepartment, UpdateDepartment } from '~/global/interface'
import useApi from './useApi'

const useDepartmentApi = () => {
  const rootEndpoint = 'departments'
  const callApi = useApi()

  const getDepartment = async (department: string) => {
    const endpoint = `/${rootEndpoint}/${department}`
    try {
      const response = await callApi('get', endpoint)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  const deleteDepartment = async (departmentId: string) => {
    const endpoint = `/${rootEndpoint}/${departmentId}`
    try {
      const response = await callApi('delete', endpoint)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  const getAllDepartments = async () => {
    const endpoint = `/${rootEndpoint}`
    try {
      const response = await callApi('get', endpoint)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  const createDepartment = async (data: CreateDepartment) => {
    const endpoint = `/${rootEndpoint}`
    try {
      const response = await callApi('post', endpoint, {}, {}, data)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  const updateDepartment = async (data: UpdateDepartment) => {
    const endpoint = `/${rootEndpoint}`
    try {
      const response = await callApi('put', endpoint, {}, {}, data)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  return { getDepartment, deleteDepartment, getAllDepartments, createDepartment, updateDepartment }
}

export default useDepartmentApi
