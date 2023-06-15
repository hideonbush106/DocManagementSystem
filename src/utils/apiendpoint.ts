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

export const getDocumentTree = (auth: string): Promise<AxiosResponse> => {
  return get('/trees', {}, { Authentication: auth, accept: 'application/json' })
}

export const getDepartments = (auth: string): Promise<AxiosResponse> => {
  return get('/departments', {}, { Authentication: auth, accept: 'application/json' })
}

export const getDepartment = (auth: string, did: string | undefined): Promise<AxiosResponse> => {
  return get(`/departments/${did}`, {}, { Authentication: auth, accept: 'application/json' })
}

export const getRooms = (auth: string, did: string | undefined): Promise<AxiosResponse> => {
  return get(`/rooms/?departmentId=${did}`, {}, { Authentication: auth, accept: 'application/json' })
}

export const getRoom = (auth: string, did: string | undefined): Promise<AxiosResponse> => {
  return get(`/rooms/${did}`, {}, { Authentication: auth, accept: 'application/json' })
}

export const getLockers = (auth: string, rid: string | undefined): Promise<AxiosResponse> => {
  return get(`/lockers/?roomId=${rid}`, {}, { Authentication: auth, accept: 'application/json' })
}
