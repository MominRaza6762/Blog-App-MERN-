import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import '../src/assets/style.css'
import { UserProvider } from './Contexts/UserContext.jsx'
import { AuthProvider } from './Contexts/AuthContext.jsx'
import { SearchProvider } from './Contexts/SearchContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <SearchProvider>
    <AuthProvider>
      <UserProvider>
        <App/>
      </UserProvider>
    </AuthProvider>
    </SearchProvider>
    
  </StrictMode>
)
