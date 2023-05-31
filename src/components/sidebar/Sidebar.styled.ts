import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Wrapper = styled.section`
  width: 15vw;
  height: 100vh;
  position: relative;
`

export const Avatar = styled.div`
  height: 18vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  margin: 3vh 0;
`
export const Image = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background-color: gray;
  overflow: hidden;
`
export const Role = styled.p`
  color: var(--grey-color);
  font-size: 14px;
`

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2vw;
`
export const Option = styled.div`
  padding: 2vh 0;
  color: var(--grey-color);
`
export const LinkContainer = styled(Link)`
  display: flex;
  align-items: center;
`
export const LogOut = styled.div`
  display: flex;
  margin-left: 4vw;
  width: 100%;
  position: absolute;
  bottom: 3vh;
  cursor: pointer;
`
