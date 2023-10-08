'use client'

import { createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

// Create a light theme
const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#2196f3',
        },
        secondary: {
            main: '#f50057',
        },
    },
});

// Create a dark theme
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#2196f3',
        },
        secondary: purple,
    },
});

export { lightTheme, darkTheme };




