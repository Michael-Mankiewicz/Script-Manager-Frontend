import * as React from 'react';
import { Component } from 'react';
import { Card, Box, Button, createTheme } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from "axios";
import { ScriptObj } from '../types/DataTypes';


function ScriptCard() {

    function FetchScript(): Promise<ScriptObj>{
        return axios.get("http://127.0.0.1:8000/api/test").then(res => res.data)
    }
    
    function RunScriptRequest(data): Promise<string>{
        return axios.put("http://127.0.0.1:8000/api/test", data)
    }
    const RunScriptMutation = useMutation({
        mutationFn: (data) => RunScriptRequest(data)
      })

    return (
        <Box sx={{width: "100vw", display: "flex", justifyContent: "center"}}>
            <Card sx={{display: "flex", justifyContent: "center"}}>
            <Box sx={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
                <h1>Test Script</h1>
                <p>runs every hour</p>
                <p>This is a demo script to test the functionality of the website. </p>
                <Box sx={{display: "flex", justifyContent: "center", flexDirection: "horizontal"}}>
                    <Button variant="contained" sx={{height: "3em"}}>Start</Button>
                    <Button variant="contained" sx={{height: "3em"}} onClick={()=>{RunScriptMutation.mutate({})}}>Run Manually</Button>
                    <Button variant="contained" sx={{height: "3em"}}>Stop</Button>
                </Box>
                <Button variant="contained" sx={{height: "3em"}}>Output Manager</Button>
            </Box>
            </Card>
        </Box>  
    );
}

export default ScriptCard;