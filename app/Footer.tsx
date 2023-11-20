import React from "react";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import BottomNavigation from '@mui/material/BottomNavigation';

function Footer() {
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    return (
        <footer className="bg-black border-t border-text">
            <Container className="text-white relative pt-5 flex flex-col items-center">
                {/* Horisontal Line */}
                <Box className="w-full h-0.5 bg-gray-400 mb-5" /> 

                <Box className="flex justify-between w-full mb-7">
                    <Box className="flex flex-col">
                        {/* Does it look better with (margin botton) Ex: mb-5, try!*/}
                        <Link
                            href="#"
                            color="inherit"
                            className="no-underline hover:text-gray-300 mb-3"
                        >
                            Lectures Talk © 2023
                        </Link>
                        <Link href="/privacy" underline="none" className="text-text text-sm no-underline hover:text-gray-300">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" underline="none" className="text-text text-sm no-underline hover:text-gray-300">
                            Terms and Conditions
                        </Link>
                    </Box>

                    <Box className="hidden md:flex space-x-3">
                        <Typography className="text-text no-underline hover:text-gray-300">
                            Made by Group 29 for INFO39014 Capstone Project
                        </Typography>
                    </Box>

                    {/* <Box className="hidden md:flex space-x-3">
                        <Link href="#" underline="none" className="text-text no-underline hover:text-gray-300">
                            Upload lecture
                        </Link>
                        <Link href="#" underline="none" className="text-text no-underline hover:text-gray-300">
                            About
                        </Link>
                        <Link href="#" underline="none" className="text-text no-underline hover:text-gray-300">
                            FAQ
                        </Link>
                    </Box> */}
                </Box>
            </Container>
        </footer>
    );
}

export default Footer;
