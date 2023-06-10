import { Breadcrumbs } from '@mui/material'
import { Link } from 'react-router-dom'
import useData from '~/hooks/useData'
import DocumentCardList from '~/components/card/DocumentCardList'

const Department = () => {
  const { documentMap } = useData()
  const departments = Array.from(documentMap, ([, value]) => value)

  return (
    <>
      <Breadcrumbs separator='/' sx={{ fontWeight: 600 }}>
        <Link to='/document'>DEPARTMENT</Link>
      </Breadcrumbs>
      <DocumentCardList type='department' items={departments} />
    </>
  )
}

export default Department
