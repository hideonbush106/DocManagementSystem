import styled from 'styled-components'

interface isMobileProps {
  mobile?: boolean
  desktop?: boolean
}

export const Wrapper = styled.div`
  background-color: var(--white-color);
  position: fixed;
  top: 0;
  z-index: 1;

  @media (min-width: 0px) {
    width: 100vw;
    height: 50px;
  }

  @media (min-width: 900px) {
    width: 220px;
    height: 100%;
  }
`
export const SideBarWrapper = styled.div<isMobileProps>`
  ${({ mobile }) =>
    mobile &&
    `@media (min-width: 0px) {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.15);
    }
    
    @media (min-width: 900px) {
      display: none;
    }`};

  ${({ desktop }) =>
    desktop &&
    `@media (min-width: 0px) {
      display: none;
    }
    @media (min-width: 900px) {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      box-shadow: 2px 0px 5px 1px rgba(0, 0, 0, 0.15);
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

export const Logo = styled.img`
  height: 90%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
//width of menu in mobile view
export const MenuMobile = styled.div`
  width: 220px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  clear: both;
`
