import * as React from 'react';
import { Component } from 'react';
import { Card, Box, Button, createTheme } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from "axios";
import { ScriptObj } from '../types/DataTypes';
import {SubmitHandler, useForm} from 'react-hook-form'

type FormFields = {
    username: string;
    password: string;
    file: FileList
}

function ScriptCard({}) {

    const {register, handleSubmit, formState: {errors}} = useForm<FormFields>();

    const uploadForm = useMutation({
        mutationFn: async (data:FormFields)=>{SendForm(data)},
        // You can specify onSuccess, onError here if needed
        onSuccess: () => {
            console.log("String Uploaded Successfully.");
        },
        onError: (error: Error) => {
            console.error("Error Uploading String:", error);
        },
    });
    const payload = {
        string1: "chipichipi",
        string2: "chapachapa"
    }

    function SendString(): Promise<void>{
        return axios.post("http://127.0.0.1:8000/api/string",payload)
                    .then((response)=>{console.log(response)})
                    .catch((err)=>{console.log(err)})
    }
    function SendForm(data:FormFields): Promise<void>{
        const formData = new FormData()
        formData.append("username", data.username)
        formData.append("password", data.password)
        if(data.file && data.file.length > 0){
            formData.append("file", data.file[0])
        }
        return axios.post("http://127.0.0.1:8000/api/settings", formData, {headers: {'Content-Type': 'multipart/form-data',}})
                    .then((response)=>{console.log(response)})
                    .catch((err)=>{console.log(err)})
    }

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
        mutationFn: async ()=>{SendString()},
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

    const onSubmit: SubmitHandler<FormFields> = (data) => {
        uploadForm.mutate(data);
    }
    return (
        <Box sx={{width: "100vw", display: "flex", justifyContent: "center"}}>
            <Card sx={{display: "flex", justifyContent: "center"}}>
            <Box sx={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
                <h1>Test Script</h1>
                <p>runs every hour</p>
                <p>This is a demo script to test the functionality of the website. </p>
                <Box sx={{display: "flex", justifyContent: "center", flexDirection: "horizontal"}}>
                    <Button variant="contained" sx={{height: "3em"}}>Start</Button>
                    <Button variant="contained" sx={{height: "3em"}} onClick={()=>{mutate()}}>Download Test PDF</Button>
                    <Button variant="contained" sx={{height: "3em"}}>Stop</Button>
                </Box>
                <Button onClick={()=>{mutate()}}>click me bitch</Button>
                <p>test form</p>
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="username">Enter username:
                    <input {...register("username")} type="text" id="username" placeholder="JCSJigglyPoof"/>
                    </label>
                    <label htmlFor="password">Enter password:
                    <input {...register("password")}type="password" id="password"/>
                    </label>
                    <label htmlFor="file">Upload File:
                    <input {...register("file")} type="file" />
                    </label>
                    <input type="submit" />
                </form>
            </Box>
            </Card>
        </Box>  
    );
}

export default ScriptCard;