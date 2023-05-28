import { publicRoutes, privateRoutes } from '~/routers/routes'
import { ThemeProvider } from 'styled-components'
import AuthProvider from '~/context/AuthContext'
import { theme } from '~/global/theme'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import PrivateRoute from './routers/PrivateRoute'
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {publicRoutes.map((route, index) => (
              <Route key={index} path={route.path} Component={route.component} />
            ))}
            {privateRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={<PrivateRoute Component={route.component} />} />
            ))}
          </Routes>
        </AuthProvider>
      </BrowserRouter>
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
