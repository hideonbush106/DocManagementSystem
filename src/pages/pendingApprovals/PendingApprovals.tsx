import ApprovalsTable from '~/components/table/ApprovalsTable'
import { FilterWrapper, HeaderWrapper, PendingApprovalsWrapper } from './PendingApprovals.styled'
import SearchField from '~/components/TextField/SearchField'
import { Collapse, IconButton, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import useDocumentApi from '~/hooks/api/useDocumentApi'
import useAuth from '~/hooks/useAuth'
import { Navigate } from 'react-router-dom'
import { Role } from '~/global/enum'
import FilterListIcon from '@mui/icons-material/FilterList'
import FilterPendingApproval from '~/components/filter/FilterPendingApproval'
import { Department } from '~/global/interface'

interface PaginationModel {
  page: number
  pageSize: number
}

const PendingApprovals = () => {
  const { user } = useAuth()
  const [searchData, setSearchData] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const { getPendingDocuments } = useDocumentApi()
  const [data, setData] = useState([])
  const [rowCountState, setRowCountState] = useState<number>(0)

  const [selectedDepartment, setSelectedDepartment] = useState<Department>({ id: '', name: '' })
  // const [selectedRoom, setSelectedRoom] = useState<Room>({ id: '', name: '', capacity: 0 })
  // const [selectedLocker, setSelectedLocker] = useState<Locker>({ id: '', name: '', capacity: 0 })
  // const [selectedFolder, setSelectedFolder] = useState<Folder>({ id: '', name: '', capacity: 0 })

  const [isFilterBoxVisible, setIsFilterBoxVisible] = useState(false)

  const [paginationModel, setPaginationModel] = useState<PaginationModel>({
    page: 0,
    pageSize: 10
  })

  const fetchData = async () => {
    setIsLoading(true)
    const result = await getPendingDocuments(
      paginationModel.pageSize,
      paginationModel.page,
      searchData,
      // selectedFolder.id ? selectedFolder.id : undefined,
      selectedDepartment.id ? selectedDepartment.id : undefined
    )
    setData(result.data.data)
    setRowCountState((prevRowCountState) => (result.data.total !== undefined ? result.data.total : prevRowCountState))
    setIsLoading(false)
  }

  const handlePaginationModelChange = (newPaginationModel: PaginationModel) => {
    setIsLoading(true)
    setData([])
    setPaginationModel(newPaginationModel)
  }

  useEffect(() => {
    if (user?.role === Role.MANAGER) {
      fetchData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginationModel, searchData, /*selectedFolder,*/ selectedDepartment])

  return user?.role === Role.MANAGER ? (
    <PendingApprovalsWrapper>
      <HeaderWrapper>
        <SearchField
          handleSearch={(value) => {
            setSearchData(value)
          }}
        />
        <IconButton sx={{ maxHeight: 'fit-content', ml: 2 }} onClick={() => setIsFilterBoxVisible((prev) => !prev)}>
          <FilterListIcon />
        </IconButton>
      </HeaderWrapper>
      <FilterWrapper>
        <Typography
          variant='h5'
          minWidth={'100px'}
          fontWeight={'bold'}
          style={{ color: 'var(--black-color)', marginTop: 'auto' }}
        >
          Files
        </Typography>
        <Collapse in={isFilterBoxVisible} timeout={300} sx={{ mt: -1, ml: 'auto' }}>
          <FilterPendingApproval
            selectedDepartment={selectedDepartment}
            setSelectedDepartment={setSelectedDepartment}
            // selectedRoom={selectedRoom}
            // setSelectedRoom={setSelectedRoom}
            // selectedLocker={selectedLocker}
            // setSelectedLocker={setSelectedLocker}
            // selectedFolder={selectedFolder}
            // setSelectedFolder={setSelectedFolder}
            filterOpen={isFilterBoxVisible}
          />
        </Collapse>
      </FilterWrapper>
      <ApprovalsTable
        view={'full'}
        rows={data}
        rowCount={rowCountState}
        loading={isLoading}
        paginationModel={paginationModel}
        reFecthData={() => fetchData()}
        handlePaginationModelChange={handlePaginationModelChange}
      />
    </PendingApprovalsWrapper>
  ) : (
    <Navigate to='/dashboard' replace />
  )
}

export default PendingApprovals
