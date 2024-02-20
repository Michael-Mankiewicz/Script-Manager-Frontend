import * as React from 'react';
import { Component } from 'react';
import { Card, Box, Button, createTheme } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from "axios";
import { ScriptObj } from '../types/DataTypes';


function ScriptCard({}) {

    function FetchPDF(): Promise<void>{
        return axios.get("http://127.0.0.1:8000/api/report", {responseType: "blob"})
            .then((response)=>{
                const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
                const pdfUrl = URL.createObjectURL(pdfBlob);
                const downloadLink = document.createElement('a');
                downloadLink.href = pdfUrl;
                downloadLink.download = "downloaded_report.pdf"; // Name of the downloaded file
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
                
                // Clean up by revoking the object URL
                URL.revokeObjectURL(pdfUrl);
            })
        console.log("fetch pdf function ran");
    }  
      
    const { mutate, isError, error } = useMutation({
        mutationFn: FetchPDF,
        // You can specify onSuccess, onError here if needed
        onSuccess: () => {
            console.log("PDF download triggered successfully.");
        },
        onError: (error: Error) => {
            console.error("Error downloading PDF:", error);
        },
    });
    //function RunScriptRequest(data): Promise<string>{
     //   return axios.put("http://127.0.0.1:8000/api/test", data)
    //}
    //const RunScriptMutation = useMutation({
     //   mutationFn: (data) => RunScriptRequest(data)
     // })

    return (
        <Box sx={{width: "100vw", display: "flex", justifyContent: "center"}}>
            <Card sx={{display: "flex", justifyContent: "center"}}>
            <Box sx={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
                <h1>Test Script</h1>
                <p>runs every hour</p>
                <p>This is a demo script to test the functionality of the website. </p>
                <Box sx={{display: "flex", justifyContent: "center", flexDirection: "horizontal"}}>
                    <Button variant="contained" sx={{height: "3em"}}>Start</Button>
                    <Button variant="contained" sx={{height: "3em"}} onClick={()=>{mutate()}}>Run Manually</Button>
                    <Button variant="contained" sx={{height: "3em"}}>Stop</Button>
                </Box>
                <Button variant="contained" sx={{height: "3em"}}>Output Manager</Button>
            </Box>
            </Card>
        </Box>  
    );
}

export default ScriptCard;