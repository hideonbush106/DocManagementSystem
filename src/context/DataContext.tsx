import React, { ReactNode } from 'react'
import { useParams } from 'react-router-dom'
import { getDocumentTree } from '~/utils/apiendpoint'
import { Department } from '~/global/interface'
import useAuth from '~/hooks/useAuth'

export type DataContextType = {
  documentTree: Department[] | null
  loading: boolean
}

export const DataContext = React.createContext<DataContextType | null>(null)
interface Props {
  children: ReactNode
}
const DataProvider = ({ children }: Props) => {
  const { did } = useParams()

  const { user } = useAuth()
  const [documentTree, setDocumentTree] = React.useState<Department[] | null>([])
  const [loading, setLoading] = React.useState<boolean>(false)
  React.useEffect(() => {
    user?.getIdToken().then((idToken) => {
      getDocumentTree(idToken)
        .then((res) => {
          setDocumentTree(res.data.data)
          setLoading(true)
        })
        .catch((err) => {
          console.log(err)
        })
    })
  }, [did, user])

  const value = { documentTree, loading }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export default DataProvider
