import DocumentCardList from '~/components/card/DocumentCardList'
import { fakeData } from '~/shared/fakeData'

const Departments = () => {
  return <DocumentCardList type='department' items={fakeData} />
}

export default Departments
