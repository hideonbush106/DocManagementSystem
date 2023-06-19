import styled from 'styled-components'

export const DocumentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

export const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;

  width: 100%;
  @media (min-width: 0px) {
    flex-direction: column-reverse;
    align-items: end;
  }
  @media (min-width: 600px) {
    flex-direction: column-reverse;
    align-items: end;
  }
`

export const ButtonWrapper = styled.div`
  @media (min-width: 0px) {
    margin: 1rem 0;
  }
  @media (min-width: 600px) {
    margin: 1rem 0;
  }
  button {
    margin-inline: 0.5rem;
  }
`

export const TreeWarpper = styled.div`
  background: white;
  width: 30%;
  border-radius: 5px;
  height: 70vh;
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
  @media (min-width: 0px) {
    width: 100%;
  }
  @media (min-width: 600px) {
    width: 100%;
  }
  @media (min-width: 900px) {
    width: 65%;
  }
  @media (min-width: 1200px) {
    width: 65%;
  }
  height: 70vh;
  margin-left: 2rem;
`
