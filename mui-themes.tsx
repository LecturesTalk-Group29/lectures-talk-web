'use client'

import { createTheme } from '@mui/material/styles';
import { purple, grey } from '@mui/material/colors';

// Create a light theme
const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#8a1c8d',
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
            main: '#8a1c8d',
        },
        secondary: grey,
    },
});

export { lightTheme, darkTheme };




