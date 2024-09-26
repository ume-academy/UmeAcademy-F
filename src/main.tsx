import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import { BrowserRouter } from 'react-router-dom'
import LanguageProvider from './contexts/language_context.tsx'
import Levelprovider from './contexts/level_context.tsx'
import CourseProvider from './contexts/course_context.tsx'
import { TransactionProvider } from './contexts/transaction_context.tsx'
import CategoryProvider from './contexts/category_context.tsx'
import { UserProviver } from './contexts/user_context.tsx'
import AuthProvider from './contexts/auth_context.tsx'
import LessonProvider from './contexts/lesson_context.tsx'


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
       <UserProviver>
        <CategoryProvider>
          <CourseProvider>
            <LanguageProvider>
              <Levelprovider>
                <LessonProvider>
                  <TransactionProvider>
                       <App />
                  </TransactionProvider>
                  </LessonProvider>
                 </Levelprovider>
              </LanguageProvider>
            </CourseProvider>
          </CategoryProvider>
        </UserProviver>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
