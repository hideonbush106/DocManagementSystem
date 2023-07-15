import useAuth from '~/hooks/useAuth'
import ImportRequestStaff from './ImportRequestStaff'
import ImportRequestEmployee from './ImportRequestEmployee'
import { Role } from '~/global/enum'

const ImportRequest = () => {
  const { user } = useAuth()
  const role = user?.role

  return <>{role === Role.MANAGER ? <ImportRequestStaff /> : <ImportRequestEmployee />}</>
}

export default ImportRequest
