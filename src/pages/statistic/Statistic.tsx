/* eslint-disable react-hooks/exhaustive-deps */
import { Grid, Paper, Typography } from '@mui/material'
import AnalysisChart from '~/components/chart/AnalysisChart'
import MonthlyChart from '~/components/chart/MonthlyChart'
import { ChartWrapper, TitleUnderline } from './Statistic.styled'
import ColumnChart from '~/components/chart/ColumnChart'
import { useEffect, useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import useStatisticApi from '~/hooks/api/useStatisticApi'
import { BorrowAnalysisData, ImportAnalysisData } from '~/global/interface'
import useAuth from '~/hooks/useAuth'

const Statistic = () => {
  const { getStatistic, getImportRequestStatistic, getBorrowRequestStatistic, getMonthlyRequestStatistic } =
    useStatisticApi()
  const { user } = useAuth()
  const [selectedYearImport, setSelectedYearImport] = useState<number>(2023)
  const [selectedYearRequest, setSelectedYearRequest] = useState<number>(2023)
  const [selectedYearMonthly, setSelectedYearMonthly] = useState<number>(2023)
  const [importRequestData, setImportRequestData] = useState([
    { name: 'Approved', color: 'var(--green-color)', value: [] },
    { name: 'Rejected', color: 'var(--red-color)', value: [] }
  ])

  const [borrowRequestData, setBorrowRequestData] = useState([
    { name: 'Approved', color: 'var(--green-color)', value: [] },
    { name: 'Rejected', color: 'var(--red-color)', value: [] }
  ])

  const [importAnalysisData, setImportAnalysisData] = useState([
    { name: 'HR', color: 'var(--primary-color)', value: 0 },
    { name: 'Employee', color: 'var(--green-color)', value: 0 },
    { name: 'Sales', color: 'var(--red-color)', value: 0 },
    { name: 'Admin', color: 'var(--yellow-color)', value: 0 }
  ])

  const [borrowAnalysisData, setBorrowAnalysisData] = useState([
    { name: 'HR', color: 'var(--primary-color)', value: 0 },
    { name: 'Employee', color: 'var(--green-color)', value: 0 },
    { name: 'Sales', color: 'var(--red-color)', value: 0 },
    { name: 'Admin', color: 'var(--yellow-color)', value: 0 }
  ])

  const [monthlyRequestData, setMonthlyRequestData] = useState([
    { name: 'Imported', color: 'var(--primary-color)', value: [] },
    { name: 'Borrowed', color: 'var(--red-color)', value: [] }
  ])

  const fetchImportRequestStatistic = async (year: number) => {
    const response = await getImportRequestStatistic(year)
    const importRequestData = response.data
    setImportRequestData([
      { name: 'Approved', color: 'var(--green-color)', value: importRequestData[0].approved },
      { name: 'Rejected', color: 'var(--red-color)', value: importRequestData[1].reject }
    ])
  }
  useEffect(() => {
    fetchImportRequestStatistic(selectedYearImport)
  }, [selectedYearImport])

  const fetchBorrowRequestStatistic = async (year: number) => {
    const response = await getBorrowRequestStatistic(year)
    const borrowRequestData = response.data
    setBorrowRequestData([
      { name: 'Approved', color: 'var(--green-color)', value: borrowRequestData[0].approved },
      { name: 'Rejected', color: 'var(--red-color)', value: borrowRequestData[1].reject }
    ])
  }
  useEffect(() => {
    fetchBorrowRequestStatistic(selectedYearRequest)
  }, [selectedYearRequest])

  const fetchImportAnalysisData = async () => {
    const response = await getStatistic('import')
    const importAnalysisData = response.data
    setImportAnalysisData((prev) => {
      importAnalysisData.forEach((data: ImportAnalysisData) => {
        const dataIndex = prev.findIndex((element) => element.name.toUpperCase() === data.name)
        if (dataIndex !== -1) prev[dataIndex].value = Number.parseInt(data.count)
      })
      return prev
    })
  }
  const fetchMonthlyRequestStatistic = async (year: number) => {
    const response = await getMonthlyRequestStatistic(year)
    const monthlyRequestData = response.data
    setMonthlyRequestData([
      { name: 'Imported', color: 'var(--primary-color)', value: monthlyRequestData[1].import },
      { name: 'Borrowed', color: 'var(--red-color)', value: monthlyRequestData[0].borrow }
    ])
  }
  useEffect(() => {
    fetchMonthlyRequestStatistic(selectedYearMonthly)
  }, [selectedYearMonthly])

  const fetchBorrowAnalysisData = async () => {
    const response = await getStatistic('borrow')
    const borrowAnalysisData = response.data
    setBorrowAnalysisData((prev) => {
      borrowAnalysisData.forEach((data: BorrowAnalysisData) => {
        const dataIndex = prev.findIndex((element) => element.name.toUpperCase() === data.name)
        if (dataIndex !== -1) prev[dataIndex].value = Number.parseInt(data.count)
      })
      return prev
    })
  }

  useEffect(() => {
    if (user?.role === 'STAFF') Promise.all([fetchBorrowAnalysisData(), fetchImportAnalysisData()])
  }, [])

  const handleYearImportChange = (value: number | null) => {
    if (value) {
      const year = dayjs(value).year()
      setSelectedYearImport(year)
    }
  }

  const handleYearRequestChange = (value: number | null) => {
    if (value) {
      const year = dayjs(value).year()
      setSelectedYearRequest(year)
    }
  }

  const handleYearMonthlyChange = (value: number | null) => {
    if (value) {
      const year = dayjs(value).year()
      setSelectedYearMonthly(year)
    }
  }

  const shouldDisableYear = (date: number) => {
    const year = dayjs(date).year()
    return year > dayjs().year()
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={user?.role === 'STAFF' ? 8 : 12}>
        <Paper sx={{ backgroundColor: 'var(--white-color)', boxShadow: 'none', height: '328px', padding: '12px 16px' }}>
          <ChartWrapper>
            <div>
              <Typography fontSize='13px' color='#797979' fontWeight={600}>
                REQUESTS MONTHLY (FILES)
              </Typography>
              <TitleUnderline />
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                views={['year']}
                sx={{
                  width: '60px',
                  height: '32px',
                  '.MuiInputBase-input': { padding: '2px 5px', textAlign: 'center', visibility: 'hidden' },
                  '.MuiInputBase-root': {
                    fontSize: '0.8rem'
                  },
                  '.MuiOutlinedInput-notchedOutline': {
                    display: 'none'
                  }
                }}
                yearsPerRow={3}
                shouldDisableYear={shouldDisableYear}
                onChange={handleYearMonthlyChange}
              />
            </LocalizationProvider>
          </ChartWrapper>
          <MonthlyChart items={monthlyRequestData} />
        </Paper>
      </Grid>
      {user?.role === 'STAFF' ? (
        <>
          <Grid item xs={12} md={6} lg={4}>
            <Paper
              sx={{ backgroundColor: 'var(--white-color)', boxShadow: 'none', height: '328px', padding: '12px 16px' }}
            >
              <Typography fontSize='13px' color='#797979' fontWeight={600}>
                IMPORTS ANALYSIS (FILES)
              </Typography>
              <TitleUnderline />
              <AnalysisChart items={importAnalysisData} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Paper
              sx={{ backgroundColor: 'var(--white-color)', boxShadow: 'none', height: '328px', padding: '12px 16px' }}
            >
              <Typography fontSize='13px' color='#797979' fontWeight={600}>
                LENDING ANALYSIS (FILES)
              </Typography>
              <TitleUnderline />
              <AnalysisChart items={borrowAnalysisData} />
            </Paper>
          </Grid>
        </>
      ) : (
        <></>
      )}
      <Grid item xs={12} md={6} lg={user?.role === 'STAFF' ? 4 : 6}>
        <Paper sx={{ backgroundColor: 'var(--white-color)', boxShadow: 'none', height: '328px', padding: '12px 16px' }}>
          <ChartWrapper>
            <div>
              <Typography fontSize='13px' color='#797979' fontWeight={600}>
                IMPORT REQUESTS
              </Typography>
              <TitleUnderline />
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                views={['year']}
                sx={{
                  width: '60px',
                  height: '32px',
                  '.MuiInputBase-input': { padding: '2px 5px', textAlign: 'center', visibility: 'hidden' },
                  '.MuiInputBase-root': {
                    fontSize: '0.8rem'
                  },
                  '.MuiOutlinedInput-notchedOutline': {
                    display: 'none'
                  }
                }}
                yearsPerRow={3}
                shouldDisableYear={shouldDisableYear}
                onChange={handleYearImportChange}
              />
            </LocalizationProvider>
          </ChartWrapper>
          <ColumnChart items={importRequestData} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={user?.role === 'STAFF' ? 4 : 6}>
        <Paper sx={{ backgroundColor: 'var(--white-color)', boxShadow: 'none', height: '328px', padding: '12px 16px' }}>
          <ChartWrapper>
            <div>
              <Typography fontSize='13px' color='#797979' fontWeight={600}>
                BORROW REQUESTS
              </Typography>
              <TitleUnderline />
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                views={['year']}
                sx={{
                  width: '60px',
                  height: '32px',
                  '.MuiInputBase-input': { padding: '2px 5px', textAlign: 'center', visibility: 'hidden' },
                  '.MuiInputBase-root': {
                    fontSize: '0.8rem'
                  },
                  '.MuiOutlinedInput-notchedOutline': {
                    display: 'none'
                  }
                }}
                yearsPerRow={3}
                shouldDisableYear={shouldDisableYear}
                onChange={handleYearRequestChange}
              />
            </LocalizationProvider>
          </ChartWrapper>
          <ColumnChart items={borrowRequestData} />
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Statistic
