import { Card, Box} from '@mui/material';
import {useMutation } from '@tanstack/react-query';
import axios from "axios";
import {SubmitHandler, useForm} from 'react-hook-form'

type FormFields = {
    cartonfile: FileList,
    fedexinvoice: FileList
}

function ScriptCard({}) {

    const {register, handleSubmit} = useForm<FormFields>();

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

    function SendForm(data:FormFields): Promise<void> {
        const formData = new FormData();
        if(data.cartonfile && data.cartonfile.length > 0){
            formData.append("cartonfile", data.cartonfile[0]);
        }
        if(data.fedexinvoice && data.fedexinvoice.length > 0){
            formData.append("fedexinvoice", data.fedexinvoice[0]);
        }
        
        // Set responseType to 'blob' to tell axios to download the binary content
        return axios.post("http://127.0.0.1:8000/api/address_change", formData, {
            headers: {'Content-Type': 'multipart/form-data'},
            responseType: 'blob', // Important for handling binary content
        })
        .then((response) => {
            // Create a URL for the blob
            const url = window.URL.createObjectURL(new Blob([response.data]));
            // Create a temporary link to trigger the download
            const link = document.createElement('a');
            link.href = url;
            // You might want to derive or set the filename dynamically
            // Here, we assume the server sets a filename or you set a default one
            const contentDisposition = response.headers['content-disposition'];
            let fileName = 'download.zip'; // A default filename in case the header is not set
            if (contentDisposition) {
                const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/);
                if (fileNameMatch.length === 2)
                    fileName = fileNameMatch[1];
            }
            link.setAttribute('download', fileName); // Set the filename
            document.body.appendChild(link);
            link.click(); // Trigger the download
            link.remove(); // Clean up after download
            window.URL.revokeObjectURL(url); // Free up resources
        })
        .catch((err) => {
            console.error(err);
        });
    }
    

    const onSubmit: SubmitHandler<FormFields> = (data) => {
        uploadForm.mutate(data);
    }

    return (
        <Box sx={{width: "100vw", display: "flex", justifyContent: "center"}}>
            <Card sx={{display: "flex", justifyContent: "center"}}>
            <Box sx={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
                <h1>Address Correction Script t</h1>
                <h3>This script creates bill invoices containing Fedex address changes per project!</h3>
                
                <form action="" onSubmit={handleSubmit(onSubmit) }>
                    <Box sx={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
                        <label htmlFor="cartonfile">Upload CartonFile2 CSV:
                            <input {...register("cartonfile")} type="file" name="cartonfile"/>
                        </label>
                        <label htmlFor="fedexinvoice">Upload Fedex Invoice CSV (Fixed Columns):
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