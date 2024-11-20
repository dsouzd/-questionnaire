import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "./i18n"
import { UserProvider } from './components/context/UserContext.jsx'
import { BrowserRouter as Router } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
        <Router future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}>
            <UserProvider>
                <App />
            </UserProvider>
        </Router>

)
