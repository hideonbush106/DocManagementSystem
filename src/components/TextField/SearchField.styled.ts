import { TextField, styled } from '@mui/material'

export const SearchFieldStyles = styled(TextField)`
  @media (min-width: 0px) {
    width: 100%;
    margin: 1rem 0;
  }
  @media (min-width: 600px) {
    width: 100%;
    margin: 1rem 0;
  }
  @media (min-width: 900px) {
    width: 40%;
  }
  @media (min-width: 1200px) {
    width: 40%;
  }
  .MuiOutlinedInput-root {
    background: white;
    border-radius: 99px;
  }
`
