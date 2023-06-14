import React, { ReactNode } from 'react'
import { getDocumentTree } from '~/utils/apiendpoint'
import { Department, DepartmentTree, FolderTree, Locker, Room } from '~/global/interface'
import useAuth from '~/hooks/useAuth'

export type DataContextType = {
  documentTree: DepartmentTree[] | null
  documentMap: Map<string, Department>
  loading: boolean
}

export const DataContext = React.createContext<DataContextType | null>(null)
interface Props {
  children: ReactNode
}
const DataProvider = ({ children }: Props) => {
  const { user } = useAuth()
  const [documentTree, setDocumentTree] = React.useState<DepartmentTree[] | null>([])
  const [documentMap, setDocumentMap] = React.useState<Map<string, Department>>(new Map())
  const [loading, setLoading] = React.useState<boolean>(true)
  React.useEffect(() => {
    if (user) {
      getDocumentTree(user.accessToken as string)
        .then((res) => {
          const tree: DepartmentTree[] = res.data.data
          setDocumentTree(tree)
          const map = new Map<string, Department>()
          tree.forEach((department) => {
            const roomMap = new Map<string, Room>()
            department.rooms.forEach((room) => {
              const lockerMap = new Map<string, Locker>()
              room.lockers.forEach((locker) => {
                const folderMap = new Map<string, FolderTree>()
                locker.folders.forEach((folder) => {
                  folderMap.set(folder.id, folder)
                })
                locker.folderMap = folderMap
                lockerMap.set(locker.id, locker)
              })
              room.lockerMap = lockerMap
              roomMap.set(room.id, room)
            })
            department.roomMap = roomMap
            map.set(department.id, department)
          })
          setDocumentMap(map)
          setLoading(false)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [user])

  const value = { documentTree, documentMap, loading }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export default DataProvider
