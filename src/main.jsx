import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { ThemeProvider } from '@mui/system';
import { themeOptions } from './theme/material-theme'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={themeOptions} >
    <App />
    </ThemeProvider>
  </React.StrictMode>,
)
