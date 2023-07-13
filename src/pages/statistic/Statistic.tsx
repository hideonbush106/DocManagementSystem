import { Grid, Paper, Typography } from '@mui/material'
import AnalysisChart from '~/components/chart/AnalysisChart'
import { TitleUnderline } from './Statistic.styled'
import ColumnChart from '~/components/chart/ColumnChart'

const Statistic = () => {
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

  const importRequestData = [
    { name: 'Approved', color: 'var(--green-color)', value: [60, 70, 80, 90, 89, 34] },
    { name: 'Rejected', color: 'var(--red-color)', value: [30, 59, 24, 64, 45, 67] }
  ]

  const borrowRequestData = [
    { name: 'Approved', color: 'var(--green-color)', value: [34, 50, 83, 45, 29, 34] },
    { name: 'Rejected', color: 'var(--red-color)', value: [30, 29, 44, 24, 45, 47] }
  ]

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
          <Typography fontSize='13px' color='#797979' fontWeight={600}>
            IMPORT REQUESTS
          </Typography>
          <TitleUnderline />
          <ColumnChart items={importRequestData} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Paper sx={{ backgroundColor: 'var(--white-color)', boxShadow: 'none', height: '328px', padding: '12px 16px' }}>
          <Typography fontSize='13px' color='#797979' fontWeight={600}>
            BORROW REQUESTS
          </Typography>
          <TitleUnderline />
          <ColumnChart items={borrowRequestData} />
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Statistic
