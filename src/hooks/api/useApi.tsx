import { AxiosError, AxiosResponse } from 'axios'
import useAuth from '../useAuth'
import { get, post, put, remove } from '~/utils/apicaller'
import { notifyError } from '~/global/toastify'

const useApi = () => {
  const { accessToken, logout, refreshAccessToken } = useAuth()

  const handleError = async (error: unknown) => {
    if (error instanceof AxiosError) {
      console.log(error)
      const errorDetails = error.response?.data.details
      if (errorDetails === 'Access denied') {
        await logout()
        notifyError('Account is not allowed to access the system')
      }
      if (errorDetails === 'Not permitted') {
        notifyError('Account is not allowed to access the resource')
      }
      if (errorDetails === 'Token expired') {
        await refreshAccessToken()
      }
      if (errorDetails === 'Token revoked') {
        await logout()
        notifyError('Session time out. Please login again')
      }
    }
    throw error
  }

  const callApi = async (
    method: 'get' | 'post' | 'put' | 'delete',
    endpoint: string,
    headers: object = {},
    params: object = {},
    body: object = {}
  ) => {
    const headersDefault = { accept: 'application/json', Authentication: accessToken }
    Object.assign(headersDefault, headers)
    let response: AxiosResponse
    try {
      switch (method) {
        case 'get': {
          response = await get(endpoint, params, headersDefault)
          break
        }
        case 'post': {
          response = await post(endpoint, body, params, headersDefault)
          break
        }
        case 'put': {
          response = await put(endpoint, body, params, headersDefault)
          break
        }
        case 'delete': {
          response = await remove(endpoint, body, params, headersDefault)
          break
        }
      }
      return response.data
    } catch (error) {
      handleError(error)
    }
  }

  return callApi
}

export default useApi
