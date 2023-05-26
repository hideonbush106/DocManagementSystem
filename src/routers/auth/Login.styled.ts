import styled from 'styled-components'

export const OuterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100vh;
  justify-content: space-between;
  padding-inline: 3rem;
`

export const LoginImg = styled.div`
  display: flex;
  width: 50%;
  justify-content: center;
  align-items: center;
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
  width: 50%;
`
export const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 2rem;
`
export const FooterText = styled.p`
  font-size: 1.2rem;
  color: #000;
  margin-right: 0.5rem;
  font-weight: 500;
`
