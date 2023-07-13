import {
  RequestContainer,
  DashboardWrapper,
  DocumentContainer,
  SumaryContainer,
  StatisticContainer,
  TitleUnderline,
  SubtitleWrapper,
  Wrapper,
  ApprovalContainer
} from './Dashboard.styled'
import { styled } from '@mui/system'
import { Typography } from '@mui/material'
import { ViewButton } from '~/components/button/Button'
import DocumentTable from '~/components/table/DocumentTable'
import { Link } from 'react-router-dom'
import RequestsTable from '~/components/table/RequestsTable'
import ApprovalsTable from '~/components/table/ApprovalsTable'
import SummaryChart from '~/components/chart/SummaryChart'
import SpaceChart from '~/components/chart/SpaceChart'
import { useEffect, useState } from 'react'
import useDocumentApi from '~/hooks/api/useDocumentApi'

const Subtitle = styled(Typography)({
  fontWeight: '600',
  fontSize: '0.85rem',
  letterSpacing: '1.2px',
  textTransform: 'uppercase',
  color: 'var(--black-light-color)'
})

interface PaginationModel {
  page: number
  pageSize: number
}

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { getPendingDocuments } = useDocumentApi()
  const [data, setData] = useState([])
  const [rowCountState, setRowCountState] = useState<number>(0)

  const [paginationModel, setPaginationModel] = useState<PaginationModel>({
    page: 0,
    pageSize: 5
  })

  const fetchData = async () => {
    setIsLoading(true)
    const result = await getPendingDocuments(paginationModel.pageSize, paginationModel.page)
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
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginationModel])

  return (
    <>
      <DashboardWrapper container spacing={{ sm: 2, xs: 0 }} margin={0}>
        <DocumentContainer xs={12} lg={8}>
          <Wrapper>
            <SubtitleWrapper>
              <div className='title'>
                <Subtitle variant='h6'>Recent Documents</Subtitle>
                <TitleUnderline />
              </div>
              <Link to='/document'>
                <ViewButton text='View All' />
              </Link>
            </SubtitleWrapper>
            <DocumentTable />
          </Wrapper>
        </DocumentContainer>
        <SumaryContainer xs={12} md={6} lg={4}>
          <Wrapper>
            <Subtitle variant='h6'>Document Summary (Files) </Subtitle>
            <TitleUnderline />
            <SummaryChart />
          </Wrapper>
        </SumaryContainer>
        <ApprovalContainer xs={12} md={6} lg={4}>
          <Wrapper>
            <SubtitleWrapper>
              <div className='title'>
                <Subtitle variant='h6'>Pending Approvals</Subtitle>
                <TitleUnderline />
              </div>
              <Link to='/pending-approval'>
                <ViewButton text='View' />
              </Link>
            </SubtitleWrapper>
            <ApprovalsTable
              view={'dashboard'}
              rows={data}
              rowCount={rowCountState}
              loading={isLoading}
              paginationModel={paginationModel}
              handlePaginationModelChange={handlePaginationModelChange}
            />
          </Wrapper>
        </ApprovalContainer>
        <RequestContainer xs={12} md={6} lg={4}>
          <Wrapper>
            <SubtitleWrapper>
              <div className='title'>
                <Subtitle variant='h6'>Borrow Requests</Subtitle>
                <TitleUnderline />
              </div>
              <Link to='/request'>
                <ViewButton text='View' />
              </Link>
            </SubtitleWrapper>
            <RequestsTable />
          </Wrapper>
        </RequestContainer>
        <StatisticContainer xs={12} md={6} lg={4}>
          <Wrapper>
            <Subtitle variant='h6'>Available Space (Pages) </Subtitle>
            <TitleUnderline />
            <SpaceChart />
          </Wrapper>
        </StatisticContainer>
      </DashboardWrapper>
    </>
  )
}

export default Dashboard
