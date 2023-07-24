import { Input, Outbox } from '@mui/icons-material'
import RequestTab from '~/components/tab/RequestTab'
import { Outlet } from 'react-router'

const Requests = () => {
  const tabs = [
    { label: 'Import Requests', href: '/request/import', icon: Input },
    { label: 'Borrow Requests', href: '/request/borrow', icon: Outbox }
  ]
  return (
    <>
      <RequestTab tabs={tabs} />
      <Outlet />
    </>
  )
}

export default Requests
