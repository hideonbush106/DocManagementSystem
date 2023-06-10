import { HeaderWrapper, IconDiv, ItemDiv, TextTitle, TextDiv, TextContent, LineStyled } from './HeaderBar.styled'
// import { Button } from '@mui/material'
import { ImportButton, ReturnButton } from '../button/Button'
const HeaderBar = () => {
  return (
    <HeaderWrapper>
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
      <ImportButton text='Import Document'></ImportButton>
      <ReturnButton text='Return Document'></ReturnButton>
      <IconDiv white style={{ cursor: 'pointer' }}>
        <img src='/assets/bell-ringing.svg' alt='' />
      </IconDiv>
    </HeaderWrapper>
  )
}

export default HeaderBar