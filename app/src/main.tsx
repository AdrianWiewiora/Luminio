import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.scss'

import Main from './pages/main/main'
import LogIn from './pages/access/logIn'
import Registration from './pages/access/registration'
import Gallery from './pages/gallery/gallery'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Main />}/>
        <Route path="/logIn" element={<LogIn />}/>
        <Route path="/registration" element={<Registration />}/>
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
