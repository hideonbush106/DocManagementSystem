import './GlobalStyle.css'

import { ReactNode } from 'react'

interface GlobalStyleProps {
  children: ReactNode
}

const GlobalStyle = ({ children }: GlobalStyleProps) => {
  return children
}

export default GlobalStyle
