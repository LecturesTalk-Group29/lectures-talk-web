"use client";

import { useState } from 'react';
import Box from "@mui/material/Box";
import { TextField, Button, Typography, LinearProgress } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Footer from "./../Footer";
import { useRouter } from 'next/navigation'

const MIN_PASSWORD_LENGTH = 4;

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [repeatPasswordError, setRepeatPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);



  const handleSignup = () => {
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

    if (password !== repeatPassword) { // 2. Adjust the validation here
      setRepeatPasswordError('Passwords do not match.');
      isValid = false;
    } else {
      setRepeatPasswordError('');
    }

    if (isValid) {
      // Process SignUp
      handleSignupRequest();
    }
  };

  const handleSignupRequest = async () => {
    //Temperary username generator
    const randomNumber = Math.floor(Math.random() * 100);
    const randomLetter = String.fromCharCode(97 + Math.floor(Math.random() * 26));
    const username = `user${randomNumber}${randomLetter}`;
    console.log(username);

    setIsLoading(true);
    try {
      const response = await fetch(`${window.location.origin}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          username: username, // You might want to replace this with a username from your form.
          password: password
        })
      });

      const data = await response.json();

      if (response.status === 201) {
        // Handle successful registration
        alert(data.message);
        redirectToLogin();
      } else if (response.status === 400) {
        // Handle bad request. You can further elaborate on this by checking specific error messages if the API provides them.
        alert("Please ensure all fields are filled correctly.");
      } else if (response.status === 409) {
        // Handle conflict
        alert("The provided email or username is already in use.");
      } else {
        // Handle other errors
        alert("An error occurred. Please try again later.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  const redirectToLogin = () => {
    router.push('/login');
  }

  return (
    <>
      <main className='flex-grow'>
        <Box className="grid place-items-center h-full">
          <Box className="flex flex-col items-center w-10/12 md:w-1/2 lg:w-1/3 space-y-3">
            <Typography variant="h4" component="h1">Signup</Typography>
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

            <TextField
              variant="outlined"
              type="password"
              label="Repeat Password"
              fullWidth
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              error={!!repeatPasswordError}
              helperText={repeatPasswordError}
            />
            <Button
              className='bg-primary'
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSignup}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={25} color='secondary'/> : "SIGN UP"}
            </Button>
            <Button
              className='bg-secondary'
              variant="contained"
              color="primary"
              fullWidth
              onClick={redirectToLogin}
            >
              already have an account
            </Button>

          </Box>
        </Box>
      </main>
      <Footer />
    </>
  )
}