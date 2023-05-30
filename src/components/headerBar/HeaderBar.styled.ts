import styled from 'styled-components'

interface IconDivProps {
  blue?: boolean
  purple?: boolean
  green?: boolean
  white?: boolean
  last?: boolean
}

export const HeaderWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3.125rem;
  margin: 0.5rem 0 0.75rem;
`

export const ItemDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* border-right: 0.5px solid var(--grey-color); */
  /* margin-right: 20px; */
  /* &:last-of-type {
    border-right: none;
  } */
`
export const LineStyled = styled.div`
  width: 0.5px;
  height: 50px;
  background-color: var(--grey-color);
`
export const IconDiv = styled.div<IconDivProps>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ blue }) =>
    blue &&
    `
    background-color: var(--blue-background-color);
    `};
  ${({ purple }) =>
    purple &&
    `
    background-color: var(--purple-background-color);
    `};
  ${({ green }) =>
    green &&
    `
    background-color: var(--green-background-color);
    `};
  ${({ white }) =>
    white &&
    `
    background-color: var(--white-color);
    `};
`

export const TextDiv = styled.div`
  margin: 0 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5px 0;
`

export const TextTitle = styled.p`
  color: var(--grey-color);
  font-size: 14px;
  padding-bottom: 10px;
`

export const TextContent = styled.p`
  color: var(--black-color);
  font-weight: 500;
`
