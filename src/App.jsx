import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { red } from '@mui/material/colors'
import VideoChat from './pages/VideoChat'
import './App.css'

const theme = createTheme({
  palette: {
    secondary: {
      main: red[500],
    },
  },
})

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <VideoChat />
      </ThemeProvider>
    </div>
  )
}

export default App
