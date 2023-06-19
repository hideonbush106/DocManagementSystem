import ImportRequest from './importRequest/ImportRequest'
import BorrowRequest from './borrowRequest/BorrowRequest'
import NavTabs from '~/components/tab/NavTabs'
import { BorrowDataContextProvider } from '~/context/BorrowDataContext'
import { ImportDataContextProvider } from '~/context/ImportDataContext'

const Requests = () => {
  const tabs = [
    { label: 'Import Requests', component: <ImportRequest /> },
    { label: 'Borrow Requests', component: <BorrowRequest /> }
  ]
  return (
    <>
      <ImportDataContextProvider>
        <BorrowDataContextProvider>
          <NavTabs tabs={tabs} />
        </BorrowDataContextProvider>
      </ImportDataContextProvider>
    </>
  )
}

export default Requests
