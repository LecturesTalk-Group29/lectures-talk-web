'use client'

import SendIcon from '@mui/icons-material/Send';
import Box from "@mui/material/Box";
import { TextField, Button, Container } from '@mui/material';

interface AiBubbleProps {
    text: string;
}

const AiBubbleProps: React.FC<AiBubbleProps> = ({ text = "Smart and insightful AI responce"}) => {

    return (
        <div className='bg-slate-500 rounded-md m-3'>
            {text}
        </div>
    );
}

export default AiBubbleProps;