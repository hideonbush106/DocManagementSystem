import ImportRequest from './importRequest/ImportRequest'
import BorrowRequest from './borrowRequest/BorrowRequest'
import NavTabs from '~/components/tab/NavTabs'
// import { RequestDataContextProvider } from '~/context/RequestContext'

const Requests = () => {
  const tabs = [
    { label: 'Import Requests', component: <ImportRequest /> },
    { label: 'Borrow Requests', component: <BorrowRequest /> }
  ]
  return (
    <>
      {/* <RequestDataContextProvider> */}
      <NavTabs tabs={tabs} />
      {/* </RequestDataContextProvider> */}
    </>
  )
}

export default Requests
