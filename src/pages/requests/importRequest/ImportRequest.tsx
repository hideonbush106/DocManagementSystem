import useAuth from '~/hooks/useAuth'
import ImportRequestStaff from './ImportRequestStaff'
import ImportRequestEmployee from './ImportRequestEmployee'

const ImportRequest = () => {
  const { user } = useAuth()
  const role = user?.role

  return <>{role === 'STAFF' ? <ImportRequestStaff /> : <ImportRequestEmployee />}</>
}

export default ImportRequest
