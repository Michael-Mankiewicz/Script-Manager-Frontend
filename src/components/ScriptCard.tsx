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
    cartonfile: FileList,
    fedexinvoice: FileList
}

function ScriptCard({}) {

    const {register, handleSubmit, formState: {errors}} = useForm<FormFields>();

    const uploadForm = useMutation({
        mutationFn: async (data:FormFields)=>{SendForm(data)},
        // You can specify onSuccess, onError here if needed
        onSuccess: () => {
            console.log("File Uploaded Successfully.");
        },
        onError: (error: Error) => {
            console.error("Error Uploading File:", error);
        },
    });

    function SendForm(data:FormFields): Promise<void>{
        const formData = new FormData()
        if(data.cartonfile && data.cartonfile.length > 0){
            formData.append("cartonfile", data.cartonfile[0])
        }
        if(data.fedexinvoice && data.fedexinvoice.length > 0){
            formData.append("fedexinvoice", data.fedexinvoice[0])
        }
        return axios.post("http://127.0.0.1:8000/api/address_change", formData, {headers: {'Content-Type': 'multipart/form-data',}})
                    .then((response)=>{console.log(response)})
                    .catch((err)=>{console.log(err)})
    }

    const onSubmit: SubmitHandler<FormFields> = (data) => {
        uploadForm.mutate(data);
    }

    return (
        <Box sx={{width: "100vw", display: "flex", justifyContent: "center"}}>
            <Card sx={{display: "flex", justifyContent: "center"}}>
            <Box sx={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
                <h1>Address Change Script</h1>
                <h3>This script creates bill invoices containing all Fedex address changes per project</h3>
                
                <form action="" onSubmit={handleSubmit(onSubmit) }>
                    <Box sx={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
                        <label htmlFor="cartonfile">Upload Fedex Invoice CSV (Fixed Columns): 
                            <input {...register("cartonfile")} type="file" name="cartonfile"/>
                        </label>
                        <label htmlFor="fedexinvoice">Upload CartonFile2 CSV: 
                            <input {...register("fedexinvoice")} type="file" name="fedexinvoice"/>
                        </label>
                        <input type="submit" />
                    </Box>
                    
                </form>
            </Box>
            </Card>
        </Box>  
    );
}

export default ScriptCard;