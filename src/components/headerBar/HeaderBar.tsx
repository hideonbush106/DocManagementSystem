import {
  HeaderWrapper,
  IconDiv,
  ItemDiv,
  TextTitle,
  TextDiv,
  TextContent,
  LineStyled,
  ItemWrapper,
  ButtonWrapper
} from './HeaderBar.styled'
import { ImportButton, ReturnButton } from '../button/Button'

const HeaderBar = () => {
  return (
    <HeaderWrapper container spacing={{ sm: 3, xs: 0 }} style={{ margin: 0 }}>
      <ItemWrapper md={12} lg={7} xl={8}>
        <ItemDiv>
          <IconDiv blue>
            <img src='/assets/sitemap.svg' alt='sitemap' />
          </IconDiv>
          <TextDiv>
            <TextTitle>Departments</TextTitle>
            <TextContent>3 Departments</TextContent>
          </TextDiv>
        </ItemDiv>
        <LineStyled />
        <ItemDiv>
          <IconDiv purple>
            <img src='/assets/user.svg' alt='sitemap' />
          </IconDiv>
          <TextDiv>
            <TextTitle>Members</TextTitle>
            <TextContent>50 Members</TextContent>
          </TextDiv>
        </ItemDiv>
        <LineStyled />
        <ItemDiv>
          <IconDiv green>
            <img src='/assets/folder.svg' alt='sitemap' />
          </IconDiv>
          <TextDiv>
            <TextTitle>Documents</TextTitle>
            <TextContent>870 Files</TextContent>
          </TextDiv>
        </ItemDiv>
      </ItemWrapper>
      <ButtonWrapper xs={12} sm={7} lg={5} xl={4}>
        <ImportButton text='Import Document'></ImportButton>
        <ReturnButton text='Return Document'></ReturnButton>
      </ButtonWrapper>
    </HeaderWrapper>
  )
}

export default HeaderBar
