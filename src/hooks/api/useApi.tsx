import { AxiosError, AxiosResponse } from 'axios'
import useAuth from '../useAuth'
import { get, post, put, remove } from '~/utils/apicaller'
import { notifyError } from '~/global/toastify'
import React from 'react'

const useApi = () => {
  const { accessToken, logout, refreshAccessToken } = useAuth()

  const handleError = async (error: unknown) => {
    if (error instanceof AxiosError) {
      console.log(error)
      const errorDetails = error.response?.data.details
      notifyError(errorDetails)
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
  /**
   * Function Documentation: `callApi`
   *
   * The `callApi` function is an asynchronous function that provides a convenient way to make API calls using different HTTP methods (GET, POST, PUT, DELETE). It accepts several parameters to customize the request and returns the response data from the API.
   *
   * @param {string} method - The HTTP method to be used for the API call. It can be one of the following values: 'get', 'post', 'put', 'delete'.
   * @param {string} endpoint - The endpoint or URL where the API call should be made.
   * @param {object} headers - (optional) Additional headers to be included in the API request. Default is an empty object.
   * @param {object} params - (optional) Query parameters to be included in the API request. Default is an empty object.
   * @param {object} body - (optional) Request body data to be included in the API request. Default is an empty object.
   *
   * @returns {Promise<any>} - A promise that resolves to the response data from the API.
   * @throws {Error} - If an error occurs during the API call.
   */
  const callApi = React.useCallback(
    async (
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
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [accessToken]
  )

  return callApi
}

export default useApi
