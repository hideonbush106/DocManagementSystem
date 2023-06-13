import styled from 'styled-components'

interface IconDivProps {
  blue?: boolean
  purple?: boolean
  green?: boolean
  white?: boolean
  last?: boolean
}
export const PendingApprovalsWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 1rem;
`
export const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
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
