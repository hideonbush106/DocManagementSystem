import ImportRequest from './importRequest/ImportRequest'
import BorrowRequest from './borrowRequest/BorrowRequest'
import NavTabs from '~/components/tab/NavTabs'
import { Input, Outbox, Output } from '@mui/icons-material'

const Requests = () => {
  const tabs = [
    { label: 'Import Requests', component: <ImportRequest />, icon: Input },
    { label: 'Borrow Requests', component: <BorrowRequest />, icon: Outbox }
  ]
  return (
    <>
      <NavTabs tabs={tabs} />
    </>
  )
}

export default Requests
