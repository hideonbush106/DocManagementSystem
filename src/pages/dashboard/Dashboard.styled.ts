import styled from 'styled-components'
import { Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'

export const Title = styled(Typography)`
  color: var(--black-color);
`
export const DashboardWrapper = styled(Grid)``

export const DocumentContainer = styled(Grid)`
  height: 40vh;
  @media (max-width: 600px) {
    margin-top: 1rem;
  }
`

export const Wrapper = styled.div`
  background-color: var(--white-color);
  width: 100%;
  height: 100%;
  padding: 01rem;
  border-radius: 5px;
`

export const SumaryContainer = styled(DocumentContainer)``

export const ApprovalContainer = styled(DocumentContainer)``

export const RequestContainer = styled(DocumentContainer)``

export const StatisticContainer = styled(SumaryContainer)``

export const TitleUnderline = styled.div`
  height: 3px;
  width: 30px;
  background-color: var(--primary-dark-color);
`

export const SubtitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`
