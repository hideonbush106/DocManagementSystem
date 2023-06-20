import React, { createContext, useEffect, useState } from 'react'
import useApi from '~/hooks/api/useApi'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RequestData = any[]

interface RequestDataContextProps {
  importRequests: RequestData
  borrowRequests: RequestData
  importTotalPage: number
  borrowTotalPage: number
}

interface BorrowDataContextProviderProps {
  children?: React.ReactNode
}

export const RequestDataContext = createContext<RequestDataContextProps>({
  importRequests: [],
  borrowRequests: [],
  importTotalPage: 0,
  borrowTotalPage: 0
})

export const RequestDataContextProvider = ({ children }: BorrowDataContextProviderProps) => {
  const callApi = useApi()
  const [importRequests, setImportRequests] = useState<RequestData>([])
  const [borrowRequests, setBorrowRequests] = useState<RequestData>([])
  const [importTotalPage, setImportTotalPage] = useState<number>(0)
  const [borrowTotalPage, setBorrowTotalPage] = useState<number>(0)

  useEffect(() => {
    const fetchImportRequests = async () => {
      try {
        const response = await callApi('get', '/import-requests')
        console.log(response.data)

        const responseData = response.data.data
        const totalPage = response.data.total

        if (responseData && Array.isArray(responseData)) {
          setImportRequests(responseData)
          setImportTotalPage(totalPage)
        }
      } catch (error) {
        console.log(error)
      }
    }

    const fetchBorrowRequests = async () => {
      try {
        const response = await callApi('get', '/borrow-requests')
        // console.log(response.data)

        const responseData = response.data.data
        console.log(responseData)

        const totalPage = response.data.total

        if (responseData && Array.isArray(responseData)) {
          setBorrowRequests(responseData)
          setBorrowTotalPage(totalPage)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchImportRequests()
    fetchBorrowRequests()
  }, [callApi])

  return (
    <RequestDataContext.Provider value={{ importRequests, borrowRequests, importTotalPage, borrowTotalPage }}>
      {children}
    </RequestDataContext.Provider>
  )
}
