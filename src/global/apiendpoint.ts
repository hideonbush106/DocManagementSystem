import { get } from './apicaller'
import { AxiosResponse } from 'axios'

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
export const getUserLogin = (auth: string): Promise<AxiosResponse> => {
  return get('/users/login', {}, { Authentication: auth, accept: 'application/json' })
}
