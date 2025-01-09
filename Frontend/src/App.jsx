import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Start from './pages/Start'
import CaptainLogin from './pages/Captainlogin'
import CaptainSignup from './pages/CaptainSignup'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import Home from './pages/Home'
import UserLogout from './pages/UserLogout'
import UserProtectWrapper from './pages/UserProtectWrapper'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
import CaptainRiding from './pages/CaptainRiding'
import CaptainHome from './pages/CaptainHome'
import CaptainLogout from './pages/CaptainLogout'
import Riding from './pages/Riding'
import 'remixicon/fonts/remixicon.css'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/Signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route path='/captain-riding' element={<CaptainRiding />} />
        <Route path='/riding' element={<Riding />} />
        <Route path="/home" element={
          <UserProtectWrapper>
            <Home />
          </UserProtectWrapper>
          } />
        <Route path="/captain-home" element={
          <CaptainProtectWrapper>
            <CaptainHome/>
          </CaptainProtectWrapper>
        } />
        <Route path='/user/logout'
          element={<UserProtectWrapper>
            <UserLogout />
          </UserProtectWrapper>
          } />
        <Route path='/captain/logout' element={
          <CaptainProtectWrapper>
            <CaptainLogout />
          </CaptainProtectWrapper>
        } />

      </Routes>
    </div>
  )
} 

export default App