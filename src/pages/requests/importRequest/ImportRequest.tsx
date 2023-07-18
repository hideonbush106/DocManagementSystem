import useAuth from '~/hooks/useAuth'
import ImportRequestManager from './ImportRequestManager'
import ImportRequestEmployee from './ImportRequestEmployee'
import { Role } from '~/global/enum'

const ImportRequest = () => {
  const { user } = useAuth()
  const role = user?.role

  return <>{role === Role.MANAGER ? <ImportRequestManager /> : <ImportRequestEmployee />}</>
}

export default ImportRequest
