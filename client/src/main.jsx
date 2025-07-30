import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './store.js'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import LoginProvider from './components/Context/LoginContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoginProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </LoginProvider>
  </StrictMode>,
)
