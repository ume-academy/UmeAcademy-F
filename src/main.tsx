import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import { BrowserRouter } from 'react-router-dom'
import LanguageProvider from './contexts/language_context.tsx'
import Levelprovider from './contexts/level_context.tsx'
import CourseProvider from './contexts/course_context.tsx'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <CourseProvider>
        <LanguageProvider>
          <Levelprovider>
            <App />
          </Levelprovider>
        </LanguageProvider>
      </CourseProvider>
    </BrowserRouter>
  </StrictMode>
);
