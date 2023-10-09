"use client";

type MessageType = 
  | { type: 'human', text: string }
  | { type: 'ai', text: string }
  | { type: 'loading' };


import Image from 'next/image'
import Box from "@mui/material/Box";
import { TextField, Button } from '@mui/material';
import Container from '@mui/material/Container';
import SendIcon from '@mui/icons-material/Send';
import { useState, useEffect, useRef } from 'react';

export default function Chat() {

	const inputRef = useRef<HTMLInputElement>(null);
	const chatboxRef = useRef<HTMLDivElement>(null);

	const [messages, setMessages] = useState<MessageType[]>([
		{ type: 'human', text: "Hello, I am Human" },
		{ type: 'ai', text: "Hello, I am AI" },
		{ type: 'loading' }
	]);

		useEffect(() => {
	    if (chatboxRef.current) {
	        const element = chatboxRef.current as HTMLDivElement;
	        element.scrollTop = element.scrollHeight;
	    }
	}, [messages]);

		const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
			e.preventDefault();
			if (inputRef.current) {
				if (inputRef.current.value === '') return;
	      setMessages([...messages, { type: 'human', text: inputRef.current.value }]);
				inputRef.current.value = '';
	    }
		};

	return (
		<main>
			<Container className='flex justify-center'>
				<div className='w-2/5 bg-secondary my-5 p-3 rounded-2xl'>
					<h1 className='m-2 w-full text-center text-lg'>Chat</h1>

					{/* Chat body */}
					<div>

						<div className='overflow-y-auto scrollbar-hide w-full bg-background h-7/10-screen p-1' ref={chatboxRef}>
							{messages.map((message, index) => {
								if (message.type === 'human') {
									return <HumanBubble key={index} text={message.text} />;
								} else if(message.type === 'ai') {
									return <AiBubble key={index} text={message.text} />;
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
									<TextField className='w-10/12' id="outlined-basic" label="Type something" variant="outlined" inputRef={inputRef}/>
									<Button onClick={handleSubmit} className='mx-2' variant="outlined"><SendIcon /></Button>
								</Box>
							</Box>
						</div>
					</div>
				</div>
			</Container>
		</main>
	)
}


function HumanBubble({ text }: { text: string }) {
	return (
		<div className='flex flex-row justify-end'>
			<div className='bg-primary rounded-2xl p-2 m-2'>
				{text}
			</div>
		</div>
	)
}

function AiBubble({ text }: { text: string }) {
	return (
		<div className='flex flex-row justify-start'>
			<div className='bg-secondary rounded-2xl p-2 m-2'>
				{text}
			</div>
		</div>
	)
}

function ThinkingAiBubble() {
	const [dots, setDots] = useState("");

		//Currently animated with JS not CSS
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