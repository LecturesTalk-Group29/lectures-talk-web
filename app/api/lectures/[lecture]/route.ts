import { NextResponse } from "next/server"

import dbClient from '../../db'
import { ObjectId } from "mongodb";
const videoColl = dbClient.db('lectures_talk').collection('videos');

export async function GET(request: Request, {params}: {params: {lecture: string}}) {    
    const savedVideo = await videoColl.findOne({_id: new ObjectId(params.lecture)});

    if(savedVideo === null) {
        return NextResponse.json({message: 'Lecture not found'}, {status: 404})
    }

    return NextResponse.json(savedVideo);
}
