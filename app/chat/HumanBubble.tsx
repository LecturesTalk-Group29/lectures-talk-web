'use client'

import SendIcon from '@mui/icons-material/Send';
import Box from "@mui/material/Box";
import { TextField, Button, Container } from '@mui/material';

interface HumanBubbleProps {
    text: string;
}

const HumanBubble: React.FC<HumanBubbleProps> = ({ text = ""}) => {

    return (
        <div className='bg-white rounded-md m-3'>
            {text}
        </div>
    );
}

export default HumanBubble;