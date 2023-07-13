/* eslint-disable react-hooks/exhaustive-deps */
import { Grid, Paper, Typography } from '@mui/material'
import AnalysisChart from '~/components/chart/AnalysisChart'
import { ChartWrapper, TitleUnderline } from './Statistic.styled'
import ColumnChart from '~/components/chart/ColumnChart'
import { useEffect, useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import useStatisticApi from '~/hooks/api/useStatisticApi'

const Statistic = () => {
  const { getImportRequestStatistic, getBorrowRequestStatistic } = useStatisticApi()
  const [selectedYearImport, setSelectedYearImport] = useState<number>(2023)
  const [selectedYearRequest, setSelectedYearRequest] = useState<number>(2023)
  const [importRequestData, setImportRequestData] = useState([
    { name: 'Approved', color: 'var(--green-color)', value: [] },
    { name: 'Rejected', color: 'var(--red-color)', value: [] }
  ])

  const [borrowRequestData, setBorrowRequestData] = useState([
    { name: 'Approved', color: 'var(--green-color)', value: [] },
    { name: 'Rejected', color: 'var(--red-color)', value: [] }
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

  const importData = [
    { name: 'HR', color: 'var(--primary-color)', value: 60 },
    { name: 'Acc', color: 'var(--green-color)', value: 40 },
    { name: 'Sales', color: 'var(--red-color)', value: 214 },
    { name: 'Admin', color: 'var(--yellow-color)', value: 30 }
  ]

  const lendingData = [
    { name: 'HR', color: 'var(--primary-color)', value: 8 },
    { name: 'Acc', color: 'var(--green-color)', value: 7 },
    { name: 'Sales', color: 'var(--red-color)', value: 20 },
    { name: 'Admin', color: 'var(--yellow-color)', value: 5 }
  ]

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

  const shouldDisableYear = (date: number) => {
    const year = dayjs(date).year()
    return year > dayjs().year()
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={8}></Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Paper sx={{ backgroundColor: 'var(--white-color)', boxShadow: 'none', height: '413px', padding: '12px 16px' }}>
          <Typography fontSize='13px' color='#797979' fontWeight={600}>
            IMPORTS ANALYSIS (FILES)
          </Typography>
          <TitleUnderline />
          <AnalysisChart items={importData} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Paper sx={{ backgroundColor: 'var(--white-color)', boxShadow: 'none', height: '328px', padding: '12px 16px' }}>
          <Typography fontSize='13px' color='#797979' fontWeight={600}>
            LENDING ANALYSIS (FILES)
          </Typography>
          <TitleUnderline />
          <AnalysisChart items={lendingData} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
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
                  '.MuiInputBase-input': { padding: '2px 5px', textAlign: 'center' },
                  '.MuiInputBase-root': {
                    fontSize: '0.8rem'
                  }
                }}
                shouldDisableYear={shouldDisableYear}
                onChange={handleYearImportChange}
              />
            </LocalizationProvider>
          </ChartWrapper>
          <ColumnChart items={importRequestData} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
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
                  '.MuiInputBase-input': { padding: '2px 5px', textAlign: 'center' },
                  '.MuiInputBase-root': {
                    fontSize: '0.8rem'
                  }
                }}
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
