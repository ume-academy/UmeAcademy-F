import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import { BrowserRouter } from 'react-router-dom'
import { TransactionProvider } from './contexts/transaction_context.tsx'
import CategoryProvider from './contexts/category_context.tsx'
import AuthProvider from './contexts/auth_context.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CategoryProvider>
          <TransactionProvider>
            <App />
          </TransactionProvider>
        </CategoryProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
