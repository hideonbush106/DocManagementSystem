import styled from 'styled-components'
import { Typography } from '@mui/material'

export const Title = styled(Typography)`
  color: var(--black-color);
`
export const DashboardWrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

export const DocumentContainer = styled.div`
  width: 55.5vw;
  height: 43vh;
  background-color: var(--white-color);
  border-radius: 5px;
  margin-bottom: 1.2rem;
  padding: 1rem;
`
export const SumaryContainer = styled(DocumentContainer)`
  width: 25vw;
  margin-right: 0;
`
export const RequestContainer = styled(DocumentContainer)`
  width: 27vw;
  height: 35vh;
  margin-bottom: 0;
`

export const StatisticContainer = styled(SumaryContainer)`
  height: 35vh;
  margin-bottom: 0;
`

export const TitleUnderline = styled.div`
  height: 3px;
  width: 30px;
  background-color: var(--primary-dark-color);
`

export const SubtitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`
