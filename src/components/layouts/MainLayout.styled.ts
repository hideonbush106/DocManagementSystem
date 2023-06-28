import styled from 'styled-components'

interface IconDivProps {
  blue?: boolean
  purple?: boolean
  green?: boolean
  white?: boolean
  last?: boolean
}

export const IconDiv = styled.div<IconDivProps>`
  width: 54px;
  height: 54px;
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
