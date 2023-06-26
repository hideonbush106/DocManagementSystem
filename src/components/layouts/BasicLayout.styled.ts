import styled from 'styled-components'
import { Typography } from '@mui/material'

export const Wrapper = styled.section`
  //in mobile view, avoid overlapping with the mainboard
  @media (min-width: 0px) {
    display: block;
  }
  //in desktop view, display: flex to avoid overlapping with the sidebar
  @media (min-width: 900px) {
    display: flex;
  }
`

export const MainContainer = styled.div`
  background-color: var(--background-color);
  padding: 25px;
  overflow: auto;

  //in mobile view, margin-top: 50px to avoid overlapping with the navbar
  @media (min-width: 0px) {
    width: 100%;
    height: calc(100vh - 50px);
    margin-top: 50px;
  }
  //in desktop view, margin-left: 200px to avoid overlapping with the sidebar
  @media (min-width: 900px) {
    width: calc(100% - 220px);
    height: 100vh;
    margin: 0;
    margin-left: 220px;
  }
`
export const Title = styled(Typography)`
  color: var(--black-color);
`
