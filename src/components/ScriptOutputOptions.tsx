import * as React from 'react';
import { Component } from 'react';
import { Card, Box, Button, createTheme } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from "axios";
import {useForm} from 'react-hook-form'


function ScriptOutputOptions() {
    return (
        <Box sx={{width: "100vw", display: "flex", justifyContent: "center"}}>
            <Card sx={{display: "flex", justifyContent: "center"}}>
            <Box sx={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
                <h1>Test Script Output</h1>
                <Box sx={{display: "flex", justifyContent: "center", flexDirection: "horizontal"}}>
                    <p>here, text will come from backend</p>
                </Box>
            </Box>
            </Card>
        </Box>  
    );
}

export default ScriptOutputOptions;