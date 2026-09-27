import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter} from 'react-router-dom'
import HikeLogContextProvider from './context/HikeLogContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <HikeLogContextProvider>
        <App/>
      </HikeLogContextProvider>
    </BrowserRouter>
    
  </StrictMode>,
)
