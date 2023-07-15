import useUserApi from '~/hooks/api/useUserApi'
import useAuth from '~/hooks/useAuth'
import BorrowRequestManager from './BorrowRequestManager'
import BorrowRequestEmployee from './BorrowRequestEmployee'
import { Role } from '~/global/enum'

const BorrowRequest = () => {
  useUserApi()
  const { user } = useAuth()
  const role = user?.role

  return <>{role === Role.MANAGER ? <BorrowRequestManager /> : <BorrowRequestEmployee />}</>
}

export default BorrowRequest
