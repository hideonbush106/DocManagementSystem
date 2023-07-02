import useUserApi from '~/hooks/api/useUserApi'
import useAuth from '~/hooks/useAuth'
import BorrowRequestStaff from './BorrowRequestStaff'
import BorrowRequestEmployee from './BorrowRequestEmployee'

const BorrowRequest = () => {
  useUserApi()
  const { user } = useAuth()
  const role = user?.role

  return <>{role === 'STAFF' ? <BorrowRequestStaff /> : <BorrowRequestEmployee />}</>
}

export default BorrowRequest
