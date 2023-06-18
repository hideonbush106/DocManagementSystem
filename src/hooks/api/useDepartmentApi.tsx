import { CreateDepartment, UpdateDepartment } from '~/global/interface'
import useApi from './useApi'
import React from 'react'

const useDepartmentApi = () => {
  const rootEndpoint = 'departments'
  const callApi = useApi()

  const getDepartment = React.useCallback(
    async (department: string) => {
      const endpoint = `/${rootEndpoint}/${department}`
      try {
        const response = await callApi('get', endpoint)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  const deleteDepartment = React.useCallback(
    async (departmentId: string) => {
      const endpoint = `/${rootEndpoint}/${departmentId}`
      try {
        const response = await callApi('delete', endpoint)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  const getAllDepartments = React.useCallback(async () => {
    const endpoint = `/${rootEndpoint}`
    try {
      const response = await callApi('get', endpoint)
      return response
    } catch (error) {
      console.log(error)
    }
  }, [callApi])

  const createDepartment = React.useCallback(
    async (data: CreateDepartment) => {
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

  const updateDepartment = React.useCallback(
    async (data: UpdateDepartment) => {
      const endpoint = `/${rootEndpoint}`
      try {
        const response = await callApi('put', endpoint, {}, {}, data)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  return { getDepartment, deleteDepartment, getAllDepartments, createDepartment, updateDepartment }
}

export default useDepartmentApi
