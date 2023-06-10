import { Breadcrumbs, Card, Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useData from '~/hooks/useData'
import { Folder as FolderData } from '~/global/interface'
const Folder = () => {
  const { did, rid, fid } = useParams()
  const [data, setData] = useState<FolderData[]>([])
  const [dept, setDept] = useState('')
  const [room, setRoom] = useState('')
  const [locker, setLocker] = useState('')
  const { documentTree } = useData()
  useEffect(() => {
    documentTree?.find((item) => {
      if (item.id === did) {
        setDept(item.name)
        item.rooms?.find((room) => {
          if (room.id === rid) {
            setRoom(room.name)
            room.lockers?.find((locker) => {
              if (locker.id === fid) {
                setLocker(locker.name)
                setData(locker.folders)
              }
            })
          }
        })
      }
    })
  }, [did, documentTree, fid, rid])
  return (
    <>
      <Breadcrumbs separator='>' sx={{ fontWeight: 600 }}>
        <Link to='/document'>DEPARTMENT</Link>
        <Link to={`/document/dept/${did}`}>{dept}</Link>
        <Link to={`/document/dept/${did}/room/${rid}`}>{room}</Link>
        <p>{locker}</p>
      </Breadcrumbs>
      <Grid container spacing={3} columnSpacing={4} sx={{ marginTop: '0.5rem' }}>
        {data.map((item, index) => (
          <Grid key={index} item md={4}>
            <Link to={`/document/dept/${did}/room/${rid}/locker/${fid}/folder/${item.id}`}>
              <Card sx={{ p: '1rem' }}>{item.name}</Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default Folder
