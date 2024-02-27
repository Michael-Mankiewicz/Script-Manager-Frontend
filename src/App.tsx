import { ThemeProvider } from '@emotion/react';
import { Card, Box, Button, createTheme, ImageList } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from "axios";
import ScriptCard from './components/ScriptCard';
import ScriptOutputOptions from './components/ScriptOutputOptions';
import logo from './assets/JCS_Family.png'


function App() {
  const theme = createTheme({
    palette: {
      primary: deepOrange
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            padding: "14px",
            width: "400px",
            height: "600px",
            borderRadius: "20px"
          }
        },
        defaultProps: {
          elevation: 10
        }
      }
    }

  })

  return (
    <ThemeProvider theme = {theme}>
        <Box >
          <img src={logo} alt="jcs-logo" />
        </Box>
        <ScriptCard></ScriptCard>
    </ThemeProvider>
  )
   
}

export default App
