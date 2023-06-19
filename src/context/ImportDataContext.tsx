import React, { createContext, useEffect, useState } from 'react'
import useApi from '~/hooks/api/useApi'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RequestData = any[]

interface RequestDataContextProps {
  requestData: RequestData
}

interface ImportDataContextProviderProps {
  children?: React.ReactNode
}

export const RequestDataContext = createContext<RequestDataContextProps>({
  requestData: []
})

export const ImportDataContextProvider = ({ children }: ImportDataContextProviderProps) => {
  const callApi = useApi()
  const [requestData, setRequestData] = useState<RequestData>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await callApi('get', '/import-requests')
        const responseData = response.data.data

        if (responseData && Array.isArray(responseData)) {
          setRequestData(responseData)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [callApi])

  return <RequestDataContext.Provider value={{ requestData }}>{children}</RequestDataContext.Provider>
}
