import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Wrapper = styled.section`
  width: 15vw;
  height: 100vh;
  position: relative;
`

export const Avatar = styled.div`
  height: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  margin: 2rem 0 1rem;
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
  margin-left: 2rem;
`
export const Option = styled.div`
  padding: 1rem 0;
  color: var(--grey-color);
`
export const LinkContainer = styled(Link)`
  display: flex;
  align-items: center;
`
export const Text = styled.p`
  line-height: 1.5rem;
  margin-left: 0.5rem;
  font-size: 14px;
`
export const LogOut = styled.div`
  display: flex;
  margin-left: 3rem;
  width: 100%;
  position: absolute;
  bottom: 2rem;
  cursor: pointer;
`
