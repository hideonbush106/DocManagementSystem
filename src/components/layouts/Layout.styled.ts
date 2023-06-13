import styled from 'styled-components'
import { Typography } from '@mui/material'

export const Wrapper = styled.section`
  display: flex;

  //in mobile view, avoid overlapping with the mainboard
  @media (max-width: 900px) {
    display: block;
  }
`

export const MainContainer = styled.div`
  background-color: var(--background-color);
  width: 100%;
  height: 100vh;
  padding: 20px;

  //in mobile view, margin-top: 50px to avoid overlapping with the navbar
  @media (max-width: 900px) {
    margin-top: 50px;
  }
  //in desktop view, margin-left: 200px to avoid overlapping with the sidebar
  @media (min-width: 900px) {
    width: calc(100% - 220px);
    margin-left: 220px;
  }
`
export const Title = styled(Typography)`
  color: var(--black-color);
`
