import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.scss'

import Main from './pages/main/main'
import LogIn from './pages/access/logIn'
import Registration from './pages/access/registration'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Main />}/>
        <Route path="/LogIn" element={<LogIn/>}/>
        <Route path="/Registration" element={<Registration/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
