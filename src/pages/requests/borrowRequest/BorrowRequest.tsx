import useUserApi from '~/hooks/api/useUserApi'
import useAuth from '~/hooks/useAuth'
import BorrowRequestStaff from './BorrowRequestStaff'

const BorrowRequest = () => {
  useUserApi()
  const { user } = useAuth()
  const role = user?.role

  return <>{role === 'STAFF' ? <BorrowRequestStaff /> : <div>Employee</div>}</>
}

export default BorrowRequest
