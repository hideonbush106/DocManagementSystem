import useApi from './useApi'

const useUserApi = () => {
  const callApi = useApi()

  const getUserLogin = async (token: string) => {
    const endpoint = '/user/login'
    const headers = { Authentication: token }
    try {
      const response = await callApi('get', endpoint, headers)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  const getUserOwn = async () => {
    const endpoint = '/user/own'
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
