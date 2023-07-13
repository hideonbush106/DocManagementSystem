/* eslint-disable react-hooks/exhaustive-deps */
import {
  DashboardWrapper,
  DocumentContainer,
  SumaryContainer,
  StatisticContainer,
  TitleUnderline,
  SubtitleWrapper,
  Wrapper,
  ApprovalContainer,
  BorrowRequestContainer
} from './Dashboard.styled'
import { styled } from '@mui/system'
import { Typography } from '@mui/material'
import { ViewButton } from '~/components/button/Button'
import DocumentTable from '~/components/table/DocumentTable'
import { Link } from 'react-router-dom'
import ApprovalsTable from '~/components/table/ApprovalsTable'
import SummaryChart from '~/components/chart/SummaryChart'
import SpaceChart from '~/components/chart/SpaceChart'
import { useEffect, useState } from 'react'
import useDocumentApi from '~/hooks/api/useDocumentApi'
import useBorrowRequestApi from '~/hooks/api/useBorrowRequestApi'
import useAuth from '~/hooks/useAuth'
import BorrowRequestsTable from '~/components/table/BorrowRequestsTable'
import useImportRequestApi from '~/hooks/api/useImportRequestApi'
import ImportRequestsTable from '~/components/table/ImportRequestsTable'
import useStatisticApi from '~/hooks/api/useStatisticApi'

const Subtitle = styled(Typography)({
  fontWeight: '600',
  fontSize: '0.85rem',
  letterSpacing: '1.2px',
  textTransform: 'uppercase',
  color: 'var(--black-light-color)',
  fontFamily: 'var(--font-family)'
})

interface PaginationModel {
  page: number
  pageSize: number
}

const Dashboard = () => {
  const { user } = useAuth()
  const role = user?.role.toLocaleUpperCase()

  //fetch API pending approval
  const [loadingApproval, setLoadingApproval] = useState(true)
  const { getPendingDocuments } = useDocumentApi()
  const [pendingApproval, setPendingApproval] = useState([])
  const [rowCountApproval, setRowCountApproval] = useState<number>(0)
  const [paginationApproval, setPaginationApproval] = useState<PaginationModel>({
    page: 0,
    pageSize: 5
  })

  useEffect(() => {
    const fetchPendingApproval = async () => {
      setLoadingApproval(true)
      const result = await getPendingDocuments(paginationApproval.pageSize, paginationApproval.page)
      setPendingApproval(result.data.data)
      setRowCountApproval((prevRowCountApproval) =>
        result.data.total !== undefined ? result.data.total : prevRowCountApproval
      )
      setLoadingApproval(false)
    }
    if (role === 'STAFF') {
      fetchPendingApproval()
    }
  }, [paginationApproval])
  const handlePaginationApprovalChange = (newPaginationApproval: PaginationModel) => {
    setLoadingApproval(true)
    setPendingApproval([])
    setPaginationApproval(newPaginationApproval)
  }

  //fetch API borrow request
  const [loadingBorrowRequests, setLoadingBorrowRequests] = useState(true)
  const { getBorrowRequestsAll, getOwnBorrowRequests } = useBorrowRequestApi()
  const [borrowRequests, setBorrowRequests] = useState([])
  const [rowCountBorrowRequests, setRowCountBorrowRequests] = useState<number>(0)
  const [paginationBorrowRequests, setPaginationBorrowRequests] = useState<PaginationModel>({
    page: 0,
    pageSize: 5
  })
  useEffect(() => {
    const fetchDataBorrowRequests = async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let result: any
      setLoadingBorrowRequests(true)
      if (role === 'STAFF') {
        result = await getBorrowRequestsAll(
          undefined,
          undefined,
          paginationBorrowRequests.pageSize,
          paginationBorrowRequests.page + 1
        )
      } else {
        result = await getOwnBorrowRequests(
          undefined,
          undefined,
          paginationBorrowRequests.pageSize,
          paginationBorrowRequests.page + 1
        )
      }
      if (result && result.data) {
        setBorrowRequests(result.data.data)
        setRowCountBorrowRequests((prevRowCountBorrowRequests) =>
          result.data.total !== undefined ? result.data.total : prevRowCountBorrowRequests
        )
      }
      setLoadingBorrowRequests(false)
    }
    fetchDataBorrowRequests()
  }, [paginationBorrowRequests])
  const handlePaginationBorrowChange = (newPaginationBorrowRequests: PaginationModel) => {
    setLoadingBorrowRequests(true)
    setBorrowRequests([])
    setPaginationBorrowRequests(newPaginationBorrowRequests)
  }

  //fetch API Import request
  const [loadingImportRequests, setLoadingImportRequests] = useState(true)
  const { getImportRequestsAll, getImportRequestsOwn } = useImportRequestApi()
  const [importRequests, setImportRequests] = useState([])
  const [rowCountImportRequests, setRowCountImportRequests] = useState<number>(0)
  const [paginationImportRequests, setPaginationImportRequests] = useState<PaginationModel>({
    page: 0,
    pageSize: 5
  })
  useEffect(() => {
    const fetchDataImportRequests = async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let result: any
      setLoadingImportRequests(true)
      if (role === 'STAFF') {
        result = await getImportRequestsAll(
          undefined,
          undefined,
          paginationImportRequests.pageSize,
          paginationImportRequests.page + 1
        )
      } else {
        result = await getImportRequestsOwn(
          undefined,
          undefined,
          paginationImportRequests.pageSize,
          paginationImportRequests.page + 1
        )
      }
      if (result && result.data) {
        setImportRequests(result.data.data)
        setRowCountImportRequests((prevRowCountImportRequests) =>
          result.data.total !== undefined ? result.data.total : prevRowCountImportRequests
        )
      }
      setLoadingImportRequests(false)
    }
    fetchDataImportRequests()
  }, [paginationImportRequests])
  const handlePaginationImportChange = (newPaginationImportRequests: PaginationModel) => {
    setLoadingImportRequests(true)
    setImportRequests([])
    setPaginationImportRequests(newPaginationImportRequests)
  }

  //fetch API documents
  const [loadingDocument, setLoadingDocument] = useState(true)
  const { getAllDocuments } = useDocumentApi()
  const [documents, setDocuments] = useState([])
  const [rowCountDocuments, setRowCountDocuments] = useState<number>(0)
  const [paginationDocuments, setPaginationDocuments] = useState<PaginationModel>({
    page: 0,
    pageSize: 5
  })
  useEffect(() => {
    const fetchDataDocuments = async () => {
      setLoadingDocument(true)
      const result = await getAllDocuments(paginationDocuments.pageSize, paginationDocuments.page)
      if (result && result.data) {
        setDocuments(result.data.data)
        setRowCountDocuments((prevRowCountDocuments) =>
          result.data.total !== undefined ? result.data.total : prevRowCountDocuments
        )
      }
      setLoadingDocument(false)
    }
    fetchDataDocuments()
  }, [paginationDocuments])
  const handlePaginationDocumentChange = (newPaginationDocuments: PaginationModel) => {
    setLoadingDocument(true)
    setDocuments([])
    setPaginationDocuments(newPaginationDocuments)
  }

  //fetch API document-summary
  const [summaryChart, setSummaryChart] = useState([])
  const [storedProp, setStoredProp] = useState([])
  const [capacityProp, setCapacityProp] = useState([])
  const { getStatistic } = useStatisticApi()
  useEffect(() => {
    const fetchSummaryChart = async () => {
      const result = await getStatistic('document-summary')
      if (result) {
        setSummaryChart(result.data)
      }
    }
    const fetchSpaceChart = async () => {
      const result = await getStatistic('space-summary')
      if (result) {
        setStoredProp(result.data[0].stored)
        setCapacityProp(result.data[1].capacity)
      }
    }
    Promise.all([fetchSummaryChart(), fetchSpaceChart()])
  }, [])

  // useEffect(() => {
  //   Promise.all([fetchPendingApproval(), fetchDataBorrowRequests(), fetchDataImportRequests()])
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [paginationApproval, paginationBorrowRequests, paginationImportRequests])

  return (
    <>
      <DashboardWrapper container spacing={{ sm: 2, xs: 0 }} margin={0}>
        <DocumentContainer xs={12} lg={8}>
          <Wrapper>
            <SubtitleWrapper>
              <div className='title'>
                <Subtitle variant='h6'>New Documents</Subtitle>
                <TitleUnderline />
              </div>
              <Link to='/document'>
                <ViewButton text='View All' />
              </Link>
            </SubtitleWrapper>
            <DocumentTable
              rows={documents}
              rowCount={rowCountDocuments}
              loading={loadingDocument}
              paginationModel={paginationDocuments}
              handlePaginationModelChange={handlePaginationDocumentChange}
            />
          </Wrapper>
        </DocumentContainer>
        <SumaryContainer xs={12} md={6} lg={4}>
          <Wrapper>
            <Subtitle variant='h6'>Document Summary (Files) </Subtitle>
            <TitleUnderline />
            <SummaryChart items={summaryChart} />
          </Wrapper>
        </SumaryContainer>
        <ApprovalContainer xs={12} md={6} lg={4}>
          <Wrapper>
            <SubtitleWrapper>
              <div className='title'>
                <Subtitle variant='h6'>{role === 'STAFF' ? 'Pending Approvals' : 'Import Requests'}</Subtitle>
                <TitleUnderline />
              </div>
              <Link to={role === 'STAFF' ? '/pending-approval' : '/request'}>
                <ViewButton text='View' />
              </Link>
            </SubtitleWrapper>
            {role === 'STAFF' ? (
              <ApprovalsTable
                view={'dashboard'}
                rows={pendingApproval}
                rowCount={rowCountApproval}
                loading={loadingApproval}
                paginationModel={paginationApproval}
                handlePaginationModelChange={handlePaginationApprovalChange}
              />
            ) : (
              <ImportRequestsTable
                rows={importRequests}
                rowCount={rowCountImportRequests}
                loading={loadingImportRequests}
                paginationModel={paginationImportRequests}
                handlePaginationModelChange={handlePaginationImportChange}
              />
            )}
          </Wrapper>
        </ApprovalContainer>
        <BorrowRequestContainer xs={12} md={6} lg={4}>
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
            <BorrowRequestsTable
              role={role}
              rows={borrowRequests}
              rowCount={rowCountBorrowRequests}
              loading={loadingBorrowRequests}
              paginationModel={paginationBorrowRequests}
              handlePaginationModelChange={handlePaginationBorrowChange}
            />
          </Wrapper>
        </BorrowRequestContainer>
        <StatisticContainer xs={12} md={6} lg={4}>
          <Wrapper>
            <Subtitle variant='h6'>Available Space (Pages) </Subtitle>
            <TitleUnderline />
            <SpaceChart stored={storedProp} capacity={capacityProp} role={role} />
          </Wrapper>
        </StatisticContainer>
      </DashboardWrapper>
    </>
  )
}

export default Dashboard
