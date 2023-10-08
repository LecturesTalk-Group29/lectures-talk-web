<<<<<<< Updated upstream
'use client'

import React from 'react';
import Paper from '@mui/material';
import Grid from '@mui/material';
import Box from '@mui/material';
import Divider from '@mui/material';
import TextField from '@mui/material';
import Typography from '@mui/material';
import List from '@mui/material';
import ListItem from '@mui/material';
import ListItemIcon from '@mui/material';
import ListItemText from '@mui/material';
import Avatar from '@mui/material';
import Fab from '@mui/material';
import SendIcon from '@mui/icons-material'
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '80vh'
  },
  headBG: {
      backgroundColor: '#e0e0e0'
  },
  borderRight500: {
      borderRight: '1px solid #e0e0e0'
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto'
  }
});

const Chat = () => {
  const classes = useStyles();

  return (
      <div>
        <Grid container>
            <Grid item xs={12} >
                <Typography variant="h5" className="header-message">Chat</Typography>
            </Grid>
        </Grid>
        <Grid container component={Paper} className={classes.chatSection}>
            <Grid item xs={3} className={classes.borderRight500}>
                <List>
                    <ListItem button key="RemySharp">
                        <ListItemIcon>
                        <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                        </ListItemIcon>
                        <ListItemText primary="John Wick"></ListItemText>
                    </ListItem>
                </List>
                <Divider />
                <Grid item xs={12} style={{padding: '10px'}}>
                    <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
                </Grid>
                <Divider />
                <List>
                    <ListItem button key="RemySharp">
                        <ListItemIcon>
                            <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                        </ListItemIcon>
                        <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
                        <ListItemText secondary="online" align="right"></ListItemText>
                    </ListItem>
                    <ListItem button key="Alice">
                        <ListItemIcon>
                            <Avatar alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg" />
                        </ListItemIcon>
                        <ListItemText primary="Alice">Alice</ListItemText>
                    </ListItem>
                    <ListItem button key="CindyBaker">
                        <ListItemIcon>
                            <Avatar alt="Cindy Baker" src="https://material-ui.com/static/images/avatar/2.jpg" />
                        </ListItemIcon>
                        <ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
                    </ListItem>
                </List>
            </Grid>
            <Grid item xs={9}>
                <List className={classes.messageArea}>
                    <ListItem key="1">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="right" primary="Hey man, What's up ?"></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="right" secondary="09:30"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem key="2">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="left" primary="Hey, Iam Good! What about you ?"></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="left" secondary="09:31"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem key="3">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="right" primary="Cool. i am good, let's catch up!"></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="right" secondary="10:30"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                </List>
                <Divider />
                <Grid container style={{padding: '20px'}}>
                    <Grid item xs={11}>
                        <TextField id="outlined-basic-email" label="Type Something" fullWidth />
                    </Grid>
                    <Grid xs={1} align="right">
                        <Fab color="primary" aria-label="add"><SendIcon /></Fab>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
      </div>
  );
}

export default Chat;
=======
"use client"

import React, { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import Box from "@mui/material/Box";
import { TextField, Button, Container } from '@mui/material';
import HumanBubble from './HumanBubble';
import AiBubble from './AiBubble';

type MessageType = 'human' | 'ai';

interface Message {
    type: MessageType;
    text: string;
}

const Chat: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState<string>('');

    const handleSend = () => {
        if (inputValue.trim() !== '') {
            setMessages([...messages, { type: 'human', text: inputValue }]);
            setInputValue('');
        }
    };

    return (
        <main>
            <Container>
                <Box>
                    {messages.map((message, index) => {
                        if (message.type === 'human') {
                            return <HumanBubble key={index} text={message.text} />;
                        } else if (message.type === 'ai') {
                            return <AiBubble key={index} text={message.text} />;
                        }
                        return null;
                    })}
                </Box>
                <Box>
                    <TextField 
                        className='bg-white' 
                        id="outlined-basic" 
                        label="Lecture URL" 
                        variant="outlined" 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <Button 
                        className='bg-blue-700 text-white h-14 w-full md:w-auto' 
                        variant="contained"
                        onClick={handleSend}
                    >
                        <SendIcon/>
                    </Button>
                </Box>
            </Container>
        </main>
    );
}

export default Chat;
>>>>>>> Stashed changes
