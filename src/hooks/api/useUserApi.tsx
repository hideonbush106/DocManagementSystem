import useApi from './useApi'

const useUserApi = () => {
  const callApi = useApi()
  const rootEndpoint = 'user'
  const getUserLogin = async (token: string) => {
    const endpoint = `/${rootEndpoint}/login`
    const headers = { Authentication: token }
    try {
      const response = await callApi('get', endpoint, headers)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  const getUserOwn = async () => {
    const endpoint = `/${rootEndpoint}/own`
    try {
      const response = await callApi('get', endpoint)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  return { getUserLogin, getUserOwn }
}

export default useUserApi
