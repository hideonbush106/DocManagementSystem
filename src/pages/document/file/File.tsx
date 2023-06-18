import React from 'react'
import { Breadcrumbs, Grid, Skeleton, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import DocumentCardList from '~/components/card/DocumentCardList'
import useDocumentApi from '~/hooks/api/useDocumentApi'
import useData from '~/hooks/useData'
import { File as FileType } from '~/global/interface'
import { fakeArray } from '~/utils/fakeArray'
import { notifyError } from '~/global/toastify'

const File = () => {
  const [files, setFile] = React.useState<FileType[]>([])
  const [loading, setLoading] = React.useState<boolean>(true)
  const { departmentId, roomId, lockerId, folderId } = useParams()
  const { documentMap } = useData()
  const { getDocumentsInFolder } = useDocumentApi()
  const department = documentMap.get(departmentId as string)
  const room = department?.roomMap?.get(roomId as string)
  const locker = room?.lockerMap?.get(lockerId as string)
  const folder = locker?.folderMap?.get(folderId as string)

  React.useEffect(() => {
    if (folder) {
      setLoading(true)
      getDocumentsInFolder(folder.id)
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
          <DocumentCardList type='file' items={files} />
        ) : (
          <Typography variant='h5' textAlign='center' mt='20px' fontFamily='inherit'>
            There is no files
          </Typography>
        )
      ) : (
        fakeArray(6).map((_, index) => (
          <Grid key={index} item md={4}>
            <Skeleton animation='wave' variant='rounded' height='3rem' />
          </Grid>
        ))
      )}
    </>
  )
}

export default File
