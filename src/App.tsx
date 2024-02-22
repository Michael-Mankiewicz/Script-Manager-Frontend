import { ThemeProvider } from '@emotion/react';
import { Card, Box, Button, createTheme } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from "axios";
import ScriptCard from './components/ScriptCard';
import ScriptOutputOptions from './components/ScriptOutputOptions';


function fetchScript(): Promise<ScriptObj>{
  return axios.get("http://127.0.0.1:8000/api/test").then(res => res.data)
}

function App() {

  const testQuery = useQuery({
    queryKey: ["test"],
    queryFn: fetchScript
  })

  /*const newPostMutation = useMutation({
    mutationFn: (title: string) => {
      return wait(1010).then(
        () => POSTS.push({ id: Math.random()*99999999, title})
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"])
    }
  })*/

  const theme = createTheme({
    palette: {
      primary: deepOrange
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            padding: "14px",
            
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
        <ScriptCard></ScriptCard>
        <ScriptOutputOptions></ScriptOutputOptions>
    </ThemeProvider>
  )
    /*
  if (testQuery.isSuccess){
    return (
      <ThemeProvider theme = {theme}>
        <Box sx={{width: "100vw", display: "flex", justifyContent: "center"}}>
          <Card  
            sx={{display: "flex", justifyContent: "center"}}
          >
            <Box sx={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
              {testQuery.data.age}
              <Button variant="contained" sx={{height: "3em"}}>Run</Button>
            </Box>
          </Card>
        </Box>
      </ThemeProvider>
    )
  } else if (testQuery.isError){
    return (
      <h1>Error</h1>
    )
  } else if (testQuery.isLoading){
    return (
      <h1>Loading...</h1>
    )
  }*/
  
  
}

export default App
