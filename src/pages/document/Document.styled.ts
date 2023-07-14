import styled from 'styled-components'

export const DocumentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 8px 4px 8px 8px;
`

export const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  @media (min-width: 1200px) {
    display: flex;
    flex-direction: row;
  }
`

export const ButtonWrapper = styled.div`
  margin: 1rem 0;
  button {
    margin-inline: 0.25rem;
  }
`

export const TreeWrapper = styled.div`
  display: flex;
  background: white;
  width: 30%;
  border-radius: 5px;
  height: 75vh;
  overflow-y: scroll;
  @media (min-width: 0px) {
    display: none;
  }
  @media (min-width: 600px) {
    display: none;
  }
  @media (min-width: 900px) {
    display: flex;
  }
  @media (min-width: 1200px) {
    display: flex;
  }
  padding: 1rem 0rem 2rem 1rem;
`

export const DocumentGrid = styled.div`
  width: 65%;
  height: 75vh;

  @media (min-width: 0px) {
    width: 100%;
    margin-left: 0;
  }
  @media (min-width: 600px) {
    margin-left: 0;
    width: 100%;
  }
  @media (min-width: 900px) {
    margin-left: 0;
    width: 65%;
  }
  @media (min-width: 1200px) {
    margin-left: 2rem;
    width: 65%;
  }
`
