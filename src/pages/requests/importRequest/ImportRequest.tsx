import useAuth from '~/hooks/useAuth'
import ImportRequestStaff from './ImportRequestStaff'

const ImportRequest = () => {
  const { user } = useAuth()
  const role = user?.role

  return <>{role === 'STAFF' ? <ImportRequestStaff /> : <div>Employee</div>}</>
}

export default ImportRequest
