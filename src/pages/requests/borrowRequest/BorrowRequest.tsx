import useUserApi from '~/hooks/api/useUserApi'
import useAuth from '~/hooks/useAuth'
import BorrowRequestStaff from './BorrowRequestStaff'
import BorrowRequestEmployee from './BorrowRequestEmployee'
import { Role } from '~/global/enum'

const BorrowRequest = () => {
  useUserApi()
  const { user } = useAuth()
  const role = user?.role

  return <>{role === Role.MANAGER ? <BorrowRequestStaff /> : <BorrowRequestEmployee />}</>
}

export default BorrowRequest
