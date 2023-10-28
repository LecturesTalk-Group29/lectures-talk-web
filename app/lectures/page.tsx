"use client";

import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import { useRouter } from "next/navigation";
import Footer from "./../Footer";  // Adjust the import path accordingly
import apiClient from '../api_client';

export default function PostLecture() {
  const router = useRouter();
  const [lectureUrl, setLectureUrl] = useState("");
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [professor, setProfessor] = useState("");
  const [errorText, setErrorText] = useState("");

  const URLFormatCheck = (url: string) => {
    // const pattern = new RegExp('^(http(s)?:\\/\\/)?' + // protocol (http or https)
    //   '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    //   '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    //   '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    //   '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    //   '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    // return !!pattern.test(url);
    return true;
  };

  const isValidURL = () => {
    setLectureUrl(lectureUrl);
    if (lectureUrl === "") {
      setErrorText("URL field is empty");
      return false;
    }
    if (!URLFormatCheck(lectureUrl)) {
      setErrorText("Invalid URL format");
      return false;
    }
    setErrorText("");
    return true;
  };

  const handleClick = () => {
    if (isValidURL()) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleModalSubmit = async () => {
    // TODO: do something with Title and Prof name
    // const lectureBtoa = btoa(lectureUrl);
    // TODO: Push to the user lectures page, where he will wait fro the lecture processing or something

    const idResponce = await apiClient("/lectures", "POST", JSON.stringify({ url: lectureUrl, title: title, professor: professor }));
    console.log(idResponce)
    const id = await idResponce.json();
    console.log(id)
    router.push(`/lectures/${id}`);
    setOpen(false);
  };

  return (
    <>
      <main className='flex-grow'>
        <Box className="grid place-items-center mt-[30vh] grid-template-rows-auto gap-0">
          <Typography variant='h5'>Lecture URL</Typography>
          <Box className="flex flex-col md:flex-row items-top w-10/12 md:w-1/2 space-x-4 space-y-3">
            <SubscriptionsIcon className='hidden md:block md:mt-7' />
            <TextField
              className="flex-grow w-full md:w-auto"
              value={lectureUrl}
              onChange={(e) => setLectureUrl(e.target.value)}
              id="outlined-basic"
              label="Lecture URL"
              variant="outlined"
              error={!!errorText}
              helperText={errorText} />
            <Button color='primary' onClick={handleClick} className='bg-primary h-14 w-full md:w-auto' variant="contained">Do AI magic</Button>
          </Box>
        </Box>



        {/* Popup Modal */}
        {/* TODO */}
        {/* IMPORTANT: Title and Prof name doesnt do anything rn, not saved and send anythere. */}
        {/* Its purely UI for now */}
        <Dialog className='bg-none'
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
          PaperProps={{ sx: { bgcolor: "transparent", backgroundImage: "none" } }}

        >
          <DialogTitle className=' bg-background rounded-t-2xl border-l border-t border-r border-white' id="form-dialog-title">Lecture Information</DialogTitle>
          <DialogContent className='bg-background border-l border-r border-white'>
            <DialogContentText>
              What is the Lecture title and who is the professor?
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Lecture Title"
              type="text"
              fullWidth
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              margin="dense"
              id="professor"
              label="Professor Name (optional)"
              type="text"
              fullWidth
              value={professor}
              onChange={(e) => setProfessor(e.target.value)}
            />
          </DialogContent>
          <DialogActions className='bg-background border-l rounded-b-2xl border-b border-r border-white'>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleModalSubmit} color="primary" disabled={!title}>
              Process the lecture
            </Button>
          </DialogActions>
        </Dialog>
      </main>
      <Footer />
    </>
  );
}