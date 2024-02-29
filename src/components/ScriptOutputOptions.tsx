import { Card, Box} from '@mui/material';



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