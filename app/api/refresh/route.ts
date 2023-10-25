import jwt from 'jsonwebtoken'
import dbClient from '../db';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import { getTokens } from '../auth-service';
import User from '@/app/user';

const userColl = dbClient.db('lectures_talk').collection('users');

export async function POST(request: Request) {
    const refreshToken = (await request.json()).refreshToken as string
    const userId = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY!!) as string
    if(!userId) {
        return NextResponse.json({message: 'Token invalid'}, {status: 401})
    }
    const user = await userColl.findOne({_id: new ObjectId(userId)}) as User
    if(!user) {
        return NextResponse.json({message: 'User not found'}, {status: 401})
    }
    return NextResponse.json(getTokens(user))
}