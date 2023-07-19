import ApprovalsTable from '~/components/table/ApprovalsTable'
import { HeaderWrapper, PendingApprovalsWrapper } from './PendingApprovals.styled'
import SearchField from '~/components/TextField/SearchField'
import { Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import useDocumentApi from '~/hooks/api/useDocumentApi'
import useAuth from '~/hooks/useAuth'
import { Navigate } from 'react-router-dom'
import { Role } from '~/global/enum'

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

  const [paginationModel, setPaginationModel] = useState<PaginationModel>({
    page: 0,
    pageSize: 10
  })

  const fetchData = async () => {
    setIsLoading(true)
    const result = await getPendingDocuments(paginationModel.pageSize, paginationModel.page, searchData)
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
  }, [paginationModel, searchData])

  return user?.role === Role.MANAGER ? (
    <PendingApprovalsWrapper>
      <HeaderWrapper>
        <SearchField
          handleSearch={(value) => {
            setSearchData(value)
          }}
        />
      </HeaderWrapper>
      <Typography variant='h5' width={'100%'} fontWeight={'bold'} style={{ color: 'var(--black-color)' }}>
        Files
      </Typography>
      <ApprovalsTable
        view={'full'}
        rows={data}
        rowCount={rowCountState}
        loading={isLoading}
        paginationModel={paginationModel}
        handlePaginationModelChange={handlePaginationModelChange}
      />
    </PendingApprovalsWrapper>
  ) : (
    <Navigate to='/dashboard' replace />
  )
}

export default PendingApprovals
