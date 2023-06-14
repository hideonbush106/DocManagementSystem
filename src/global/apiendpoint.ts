import { get } from './apicaller'
import { AxiosError, AxiosResponse } from 'axios'

/**
 * Retrieves the user's own data by sending a GET request to the '/users/own' endpoint.
 *
 * @param {string} auth - The user credential object containing authentication details.
 * @returns {Axios} - An Axios instance for making the GET request.
 */
export const getUserOwn = (auth: string): Promise<AxiosResponse> => {
  return get('/users/own', {}, { Authentication: auth, accept: 'application/json' })
}

/**
 * Sends a GET request to retrieve user data using authentication.
 *
 * @param {string} auth - The authentication token.
 * @returns {Axios} - An Axios instance for making the GET request.
 */
export const getUserLogin = (auth: string): Promise<AxiosResponse | void> => {
  return get('/users/login', {}, { Authentication: auth, accept: 'application/json' }).catch(async (error) => {
    if (error instanceof AxiosError) {
      const errorDetails = error.response?.data.details
      if (errorDetails === 'Access denied') throw new Error('Account is denied')
      if (errorDetails === 'Token expired') throw new Error('Token expired')
      if (errorDetails === 'Token revoked') throw new Error('Session time out. Please login again')
      throw new Error('Something went wrong')
    }
  })
}
