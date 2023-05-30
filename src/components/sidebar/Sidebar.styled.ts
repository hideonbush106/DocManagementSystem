import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Wrapper = styled.section`
  width: 15vw;
  height: 100vh;
  position: relative;
`

export const Avatar = styled.div`
  height: 180px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  margin: 2rem 0;
`
export const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: gray;
  overflow: hidden;
`
export const Role = styled.p`
  color: var(--gray-color);
  text-align: center;
  font-size: 14px;
`

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 2rem 0 2.5rem;
`
export const Option = styled.div`
  padding: 1rem 0;
  color: var(--gray-color);
`
export const LinkContainer = styled(Link)`
  display: flex;
  align-items: center;
`
export const Text = styled.p`
  line-height: 1.5rem;
  margin-left: 1rem;
  font-size: 15px;
`
export const LogOut = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: absolute;
  bottom: 2rem;
  cursor: pointer;
`
