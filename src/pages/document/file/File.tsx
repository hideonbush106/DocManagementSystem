import React from 'react'
import { Box, Breadcrumbs, CircularProgress, Typography } from '@mui/material'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import DocumentCardList from '~/components/card/DocumentCardList'
import useDocumentApi from '~/hooks/api/useDocumentApi'
import useData from '~/hooks/useData'
import { File as FileType } from '~/global/interface'
import { notifyError } from '~/global/toastify'

const File = () => {
  const [files, setFile] = React.useState<FileType[]>([])
  const [loading, setLoading] = React.useState<boolean>(true)
  const { departmentId, roomId, lockerId, folderId } = useParams()
  const [search] = useSearchParams()
  const { documentMap } = useData()
  const { getDocumentsInFolder } = useDocumentApi()
  const department = documentMap.get(departmentId as string)
  const room = department?.roomMap?.get(roomId as string)
  const locker = room?.lockerMap?.get(lockerId as string)
  const folder = locker?.folderMap?.get(folderId as string)

  const fetchDocumentsInFolder = async () => {
    if (folder) {
      setLoading(true)
      getDocumentsInFolder(folder.id, 1)
        .then(({ data }) => {
          setFile(data.data as FileType[])
          setLoading(false)
        })
        .catch((error) => {
          console.log(error)
          setLoading(false)
          notifyError('Failed to get files')
        })
    }
  }
  React.useEffect(() => {
    fetchDocumentsInFolder()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      {!loading ? (
        files.length > 0 ? (
          <DocumentCardList
            type='file'
            items={files}
            itemId={search.get('documentId')}
            fetchFolder={fetchDocumentsInFolder}
          />
        ) : (
          <Typography variant='body1' textAlign='center' mt='20px' fontFamily='inherit'>
            There is no files
          </Typography>
        )
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} width={'100%'} height={'100%'}>
          <CircularProgress />
        </Box>
      )}
    </>
  )
}

export default File
