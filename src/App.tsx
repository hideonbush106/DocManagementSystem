import { publicRoutes, privateRoutes } from '~/routers/routes'
import { ThemeProvider } from 'styled-components'
import AuthProvider, { AuthContext } from '~/context/AuthContext'
import { theme } from '~/global/theme'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const userAcccessToken = localStorage.getItem('userAccessToken')
  const user = useContext(AuthContext).user
  // const date = Date.now()
  // console.log(date)
  useEffect(() => {
    if (userAcccessToken) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [isLoggedIn, userAcccessToken, user])

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {!isLoggedIn ? (
              publicRoutes.map((route, index) => <Route key={index} path={route.path} Component={route.component} />)
            ) : (
              <Route path='*' element={<Navigate to='/welcome' />} />
            )}
            {isLoggedIn ? (
              privateRoutes.map((route, index) => <Route key={index} path={route.path} Component={route.component} />)
            ) : (
              <Route path='*' element={<Navigate to='/' />} />
            )}
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
// import { useState } from 'react'
// import './App.css'
// import Scanner from './Scanner'
// import { QrcodeSuccessCallback } from 'html5-qrcode'

// const App = () => {
//   const [decodedResults, setDecodedResults] = useState<string[]>([])
//   const onNewScanResult = (decodedResult: string) => {
//     console.log('App [result]', decodedResult)
//     setDecodedResults((prev) => [...prev, decodedResult])
//   }

//   return (
//     <div className='App'>
//       <section className='App-section' style={{ width: '500px' }}>
//         <div className='App-section-title'> Html5-qrcode React demo</div>
//         <br />
//         <br />
//         <br />
//         <Scanner fps={10} qrbox={250} disableFlip={false} qrCodeSuccessCallback={onNewScanResult} />
//       </section>
//     </div>
//   )
// }

// export default App
