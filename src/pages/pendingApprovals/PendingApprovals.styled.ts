import styled from 'styled-components'

export const PendingApprovalsWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100% - 50px);
`
export const HeaderWrapper = styled.div`
  width: 100%;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
`

export const FilterWrapper = styled(HeaderWrapper)`
  align-items: flex-start;
`
