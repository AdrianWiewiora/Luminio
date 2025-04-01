import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.scss'

import Main from './pages/main/main.tsx'
import LogIn from './pages/access/logIn.tsx'
import Registration from './pages/access/registration.tsx'
import Gallery from './pages/gallery/gallery.tsx'
import Album from './pages/album/album.tsx'
import Author from './pages/author/author.tsx'
import NotFound from "./pages/notFound/notFound.tsx"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Main />}/>
        <Route path="/login" element={<LogIn />}/>
        <Route path="/registration" element={<Registration />}/>
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/album" element={<Album />}/>
        <Route path="/author/:id" element={<Author />} />
        <Route path="*" element={<NotFound />} /> 
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
