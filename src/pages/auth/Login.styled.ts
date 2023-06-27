import styled from 'styled-components'

export const OuterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100vh;
  justify-content: space-between;

  @media (min-width: 0px) {
    flex-direction: column;
    justify-content: space-evenly;
    padding-inline: 1rem;
  }
  @media (min-width: 600px) {
    flex-direction: row;
    padding-inline: 1rem;
  }
  @media (min-width: 900px) {
    flex-direction: row;
    padding-inline: 3rem;
  }
  @media (min-width: 1200px) {
    flex-direction: row;
    padding-inline: 3rem;
  }
`

export const LoginImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 0px) {
    width: 100%;
  }
  @media (min-width: 600px) {
    width: 100%;
  }
  @media (min-width: 900px) {
    width: 50%;
  }
  @media (min-width: 1200px) {
    width: 50%;
  }
  img {
    width: 90%;
    object-fit: cover;
  }
`

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 0px) {
    width: 100%;
  }
  @media (min-width: 600px) {
    width: 100%;
  }
  @media (min-width: 900px) {
    width: 50%;
  }
  @media (min-width: 1200px) {
    width: 50%;
  }
  div {
    @media (min-width: 0px) {
      width: 100%;
    }
    @media (min-width: 600px) {
      width: 100%;
    }
    @media (min-width: 900px) {
      width: 70%;
    }
    @media (min-width: 1200px) {
      width: 70%;
    }
  }
`
export const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 2rem;
  height: fit-content;
`
export const FooterText = styled.p`
  font-size: 1.2rem;
  color: #000;
  margin-right: 0.5rem;
  font-weight: 500;
`
