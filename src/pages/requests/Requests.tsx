import ImportRequest from './importRequest/ImportRequest'
import BorrowRequest from './borrowRequest/BorrowRequest'
import NavTabs from '~/components/tab/NavTabs'

const Requests = () => {
  const tabs = [
    { label: 'Import Requests', component: <ImportRequest /> },
    { label: 'Borrow Requests', component: <BorrowRequest /> }
  ]
  return (
    <>
      <NavTabs tabs={tabs} />
    </>
  )
}

export default Requests
