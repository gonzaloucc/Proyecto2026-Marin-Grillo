import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import '@styles/index.scss'
import Layout from '@components/Layout.jsx'
import Home from '@pages/Home.jsx'
import Carta from '@pages/Carta.jsx'
import Pedido from '@pages/Pedido.jsx'
import Carrito from '@pages/Carrito.jsx'
import NoEncontrada from '@pages/NoEncontrada.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="carta" element={<Carta />} />
          <Route path="pedido" element={<Pedido />} />
          <Route path="carrito" element={<Carrito />} />
          <Route path="*" element={<NoEncontrada />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
