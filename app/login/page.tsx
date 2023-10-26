"use client";

import { useState } from 'react';
import Box from "@mui/material/Box";
import { TextField, Button, Typography,CircularProgress } from '@mui/material';
import Footer from "./../Footer";
import { useRouter } from 'next/navigation'

const MIN_PASSWORD_LENGTH = 4;

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid = true;

    if (!emailPattern.test(email)) {
      setEmailError('Please enter a valid email.');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      setPasswordError(`Password should be at least ${MIN_PASSWORD_LENGTH} characters long.`);
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (isValid) {
      // Process Login
      handleLoginRequest();

    }
  };

  const handleLoginRequest = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${window.location.origin}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Save the token and refreshToken in a secure place (e.g., cookies, local storage, state management, etc.)
        localStorage.setItem('token', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);

        // Redirect to home page (later it should be a dashboard or something)
        router.push('/');
      } else if (response.status === 400) {
        alert('Credentials are missing.');
      } else if (response.status === 401) {
        alert('Invalid credentials.');
      } else if (response.status === 500) {
        alert('Server error. Please try again later.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred. Please try again later.');
    }finally {
      setIsLoading(false);
    }
  }



  const redirectToSignup = () => {
    router.push('/signup');
  }


  return (
    <>
      <main className='flex-grow'>
        <Box className="grid place-items-center h-full">
          <Box className="flex flex-col items-center w-10/12 md:w-1/2 lg:w-1/3 space-y-3">
            <Typography variant="h4" component="h1">Login</Typography>
            <TextField
              variant="outlined"
              type="email"
              label="Email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!emailError}
              helperText={emailError}
            />

            <TextField
              variant="outlined"
              type="password"
              label="Password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!passwordError}
              helperText={passwordError}
            />

            <Button
              className='bg-primary'
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={25} color='secondary'/> : "LOGIN"}
            </Button>
            <Button
              className='bg-secondary'
              variant="contained"
              color="primary"
              fullWidth
              onClick={redirectToSignup}
            >
              New user
            </Button>


          </Box>
        </Box>
      </main>
      <Footer />
    </>
  )
}