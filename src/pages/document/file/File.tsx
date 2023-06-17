import React from 'react'
import { Breadcrumbs } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import DocumentCardList from '~/components/card/DocumentCardList'
import useDocumentApi from '~/hooks/api/useDocumentApi'
import useData from '~/hooks/useData'
import { File as FileType } from '~/global/interface'

const File = () => {
  const [files, setFile] = React.useState<FileType[]>([])
  const { departmentId, roomId, lockerId, folderId } = useParams()
  const { documentMap } = useData()
  const { getDocumentsInFolder } = useDocumentApi()
  const department = documentMap.get(departmentId as string)
  const room = department?.roomMap?.get(roomId as string)
  const locker = room?.lockerMap?.get(lockerId as string)
  const folder = locker?.folderMap?.get(folderId as string)

  React.useEffect(() => {
    if (folder) {
      getDocumentsInFolder(folder.id).then(({ data }) => {
        setFile(data as FileType[])
      })
    }
  }, [folder, getDocumentsInFolder])

  return (
    <>
      <Breadcrumbs separator='>' sx={{ fontWeight: 600 }}>
        <Link to='/document'>DEPARTMENT</Link>
        <Link to={`${location.pathname.substring(0, location.pathname.indexOf('room'))}`}>{department?.name}</Link>
        <Link to={`${location.pathname.substring(0, location.pathname.indexOf('locker'))}`}>{room?.name}</Link>
        <Link to={`${location.pathname.substring(0, location.pathname.indexOf('folder'))}`}>{locker?.name}</Link>
        <p>{folder?.name}</p>
      </Breadcrumbs>
      <DocumentCardList type='file' items={files ? files : []} />
    </>
  )
}

export default File
