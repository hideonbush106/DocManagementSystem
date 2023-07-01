import { Grid, Paper, Typography } from '@mui/material'
import AnalysisChart from '~/components/chart/AnalysisChart'
import { TitleUnderline } from './Statistic.styled'

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

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={8}></Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Paper sx={{ backgroundColor: 'var(--white-color)', boxShadow: 'none', height: '413px', padding: '12px 16px' }}>
          <Typography fontSize='13px' color='#797979' fontWeight={600}>
            IMPORTS ANALYSIS
          </Typography>
          <TitleUnderline />
          <AnalysisChart items={importData} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Paper sx={{ backgroundColor: 'var(--white-color)', boxShadow: 'none', height: '328px', padding: '12px 16px' }}>
          <Typography fontSize='13px' color='#797979' fontWeight={600}>
            LENDING ANALYSIS
          </Typography>
          <TitleUnderline />
          <AnalysisChart items={lendingData} />
        </Paper>
      </Grid>
      <Grid item xs={12} lg={8}></Grid>
    </Grid>
  )
}

export default Statistic
