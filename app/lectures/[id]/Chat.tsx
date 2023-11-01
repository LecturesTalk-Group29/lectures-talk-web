"use client";

type MessageType =
	| { type: 'human', text: string }
	| { type: 'ai', text: string }
	| { type: 'loading' };
type ServerRequest = {query: string};
type ServerResponse = {content: string};

import Box from "@mui/material/Box";
import { TextField, Button } from '@mui/material';
import Container from '@mui/material/Container';
import SendIcon from '@mui/icons-material/Send';
import { useState, useEffect, useRef, KeyboardEvent } from 'react';
import axios from 'axios'; 
import showdown from 'showdown';
import { HumanBubble, AiBubble } from "./ChatBubbles";

// TODO: Add mockup language UI support
export default function Chat() {

	const CURRENT_ENDPOINT: string = "/api/chat";
	// const CURRENT_ENDPOINT: string = "/queryGPT";

	const inputRef = useRef<HTMLInputElement>(null);
	const chatboxRef = useRef<HTMLDivElement>(null);

	const converter = new showdown.Converter();

	// TODO: 
	// Save user's conversation with AI somehow. Maybe start with saving it to local storage,
	// When user auth is implemented - save it to the database
	const [messages, setMessages] = useState<MessageType[]>([
		{ type: 'ai', text: "Hello, ask me any question about the lecture" },
	]);

	//Handles scrolling to the bottom of the chatbox when messages are added
	useEffect(() => {
		if (chatboxRef.current) {
			const element = chatboxRef.current as HTMLDivElement;
			element.scrollTop = element.scrollHeight;
		}
	}, [messages]);
	
	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    }

	const handleSubmit = async (e?: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) => {
		if (e) {
			e.preventDefault();
		}
		if (inputRef.current) {
			//this pattern is used to remove TS18047 warning
			const inputValue = inputRef.current.value;
    		if (inputValue === '') return;
			
			// Add user and AI message to the messages array
			setMessages(prevMessages => [...prevMessages, { type: 'human', text: inputValue }]);
			setMessages(prevMessages => [...prevMessages, { type: 'loading' }]);
			
			try {
				// Send message to the server
				console.log("query: " + inputRef.current.value);
				const request: ServerRequest = { query: inputRef.current.value };
				inputRef.current.value = '';
				const response = await axios.post<ServerResponse>(CURRENT_ENDPOINT, request);
				// Remove the loading message and add AI response to the messages array
				setMessages(prevMessages => {
					// Filter out the loading message
					const updatedMessages = prevMessages.filter(message => message.type !== 'loading');
					// Add the AI response
					updatedMessages.push({ type: 'ai', text: response.data.content });
					return updatedMessages;
				});
			
			} catch (error) {
				console.error('Error:', error);
				// Optionally remove the loading message if an error occurs
				setMessages(prevMessages => prevMessages.filter(message => message.type !== 'loading'));
			}
		}
	};



	return (
		<main>
			<Container className='flex justify-center'>
				<div className='w-full bg-secondary my-5 p-3 rounded-2xl'>
					<h1 className='m-2 w-full text-center text-lg'>Chat</h1>

					{/* Chat body */}
					<div>

						<div className='overflow-y-auto scrollbar-hide w-full bg-background h-6/10-screen p-1' ref={chatboxRef}>
							{messages.map((message, index) => {
								if (message.type === 'human') {
									const htmlText = converter.makeHtml(message.text);
									return <HumanBubble key={index} text={htmlText} />;
								} else if (message.type === 'ai') {
									const htmlText = converter.makeHtml(message.text);
									return <AiBubble key={index} text={htmlText} />;
								} else {
									return <ThinkingAiBubble key={index} />;
								}
							})}
						</div>

						{/* Chat input */}
						<div>
							<Box
							>
								<Box className="flex justify-between w-full pt-3">
									<TextField className='w-10/12' onKeyDown={handleKeyDown} id="outlined-basic" color="secondary" label="Ask question" variant="outlined" inputRef={inputRef} />
									<Button onClick={handleSubmit} className='mx-2' color="secondary" variant="outlined"><SendIcon /></Button>
								</Box>
							</Box>
						</div>
					</div>
				</div>
			</Container>
		</main>
	)
}


function ThinkingAiBubble() {
	// Removing default "|" will change the autoscroll bechaviour
	// Part of loading will be hidden behind the bottom inout field
	const [dots, setDots] = useState("|");

	useEffect(() => {
		const interval = setInterval(() => {
			const maxDots = 7;

			setDots((prevDots) => {
				let dotsNum = prevDots.length;
				dotsNum = (dotsNum % (maxDots - 1)) + 1;

				let dots = '';
				for (let i = 0; i < dotsNum; i++) {
					dots += '|';
				}

				return dots;
			});
		}, 200);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className='flex flex-row justify-start'>
			<div className='bg-secondary rounded-2xl p-2 m-2 w-12'>
				<p className='w-full'>
					{dots}
				</p>
			</div>
		</div>
	)
}