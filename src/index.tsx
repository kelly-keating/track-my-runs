import React from 'react'
import ReactDOM from 'react-dom/client'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/en-nz'

import './styles/index.scss'
import './firebase'

import App from './App'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-nz'>
      <App />
    </LocalizationProvider>
  </React.StrictMode>
)
