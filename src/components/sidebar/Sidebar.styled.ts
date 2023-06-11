import styled from 'styled-components'

interface isMobileProps {
  mobile?: boolean
  desktop?: boolean
}

export const Wrapper = styled.div`
  width: 200px;
  height: 100%;
  background-color: var(--white-color);
  position: fixed;
  top: 0;
  z-index: 1;

  @media (max-width: 900px) {
    width: 100vw;
    height: 50px;
  }
`
export const SideBarWrapper = styled.div<isMobileProps>`
  width: 100%; //for mobile view
  height: 100%; //for mobile view
  display: none;

  ${({ mobile }) =>
    mobile &&
    `@media (max-width: 900px) {
      display: flex;
      align-items: center;
    }`};

  ${({ desktop }) =>
    desktop &&
    `@media (min-width: 900px) {
      display: flex;
      flex-direction: column;
      align-items: center;
    }`};
`

export const Avatar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  margin: 3vh 0;
`
export const Image = styled.img`
  width: 80px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  background-color: var(--white-color);
  text-align: center;
  overflow: hidden;
  margin: 20px;
`
//width of menu in mobile view
export const MenuMobile = styled.div`
  width: 200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  clear: both;
`
