import styled from 'styled-components'

export const DocumentWrapper = styled.div`
  padding: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

export const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  width: 100%;
`

export const ButtonWrapper = styled.div`
  button {
    margin-inline: 0.5rem;
  }
`

export const TreeWrapper = styled.div`
  display: flex;
  background: white;
  width: 25%;
  border-radius: 5px;
  height: 70vh;
  overflow-y: scroll;
  padding: 1rem 0rem 2rem 1rem;
`

export const DocumentGrid = styled.div`
  width: 70%;
  height: 70vh;
  margin-left: 2rem;
`
