import styled from 'styled-components'

interface StatusDivProps {
  accepted?: boolean
  rejected?: boolean
}

export const StatusDiv = styled.div<StatusDivProps>`
  width: fit-content;
<<<<<<< HEAD
  height: 33px;
=======
  height: 30px;
>>>>>>> 33895b6 (Add detail modal)
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
