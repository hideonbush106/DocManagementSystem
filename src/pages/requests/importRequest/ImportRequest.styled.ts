import styled from 'styled-components'

interface StatusDivProps {
  accepted?: boolean
  rejected?: boolean
}

export const StatusDiv = styled.div<StatusDivProps>`
  width: fit-content;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--white-color);
  border-radius: 5px;
  padding: 5px 15px;
  ${({ accepted }) =>
    accepted &&
    `
    background-color: var(--green-color);
    `};
  ${({ rejected }) =>
    rejected &&
    `
    background-color: var(--red-color);
  `}
`
