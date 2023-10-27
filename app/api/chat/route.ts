import { NextResponse } from 'next/server';
import { createEmbedding, findSimilarDocuments, generateGPTResponse } from '../utils/utils';
import { Document } from 'mongodb';
import { json } from 'node:stream/consumers';

/*
export async function POST(request: Request) {
    if (request.method !== 'POST') {
        return NextResponse.json({message: 'Not POST'}, {status: 401});
    }

    const query  = request.body;
    const messageEmbeddings = await createEmbedding(query);
    const similarDocuments = await findSimilarDocuments(messageEmbeddings);
    const relevantInfo = similarDocuments;

    const gptPrompt = "Based on " + relevantInfo + " and your knowledge, " + query;
    if (!query) {
        return NextResponse.json({ message: 'Message is required in the request body' }, {status: 400});
    }

    try {
        const content = generateGPTResponse(gptPrompt)
        NextResponse.json({ content });
    } catch (error) {
        console.error('Error:', error);
       NextResponse.json({ error: 'Internal Server Error' }, {status: 500});
    }
}
*/
let similarDocumentsText: string | Document | null = null;

export async function POST(request: Request) {
    if (request.method !== 'POST') {
        return NextResponse.json({ message: 'Not POST' }, { status: 401 });
    }

    const requestBody = await request.json();
    const query = requestBody.query;
    // check if similarDocumentsText is null 
    //this way it doesnt redo the vector search with every query
    if (!similarDocumentsText) {
        // Create and set the similarDocumentsText for the first time.
        const messageEmbeddings = await createEmbedding(query);
        similarDocumentsText = await findSimilarDocuments(messageEmbeddings);
    }

    const gptPrompt = "Based on " + similarDocumentsText + " and your knowledge, " + query;

    if (!query) {
        return NextResponse.json({ message: 'Message is required in the request body' }, { status: 400 });
    }

    try {
        const content = await generateGPTResponse(gptPrompt);
        return NextResponse.json(content);
    } catch (error) {
        console.error('Error:', error);
        return await NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}