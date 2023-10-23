import crypto from 'crypto'
import jwt from 'jsonwebtoken'

import dbClient from '../../db';
import { NextResponse } from 'next/server';
import User from '@/app/user';

const userColl = dbClient.db('lectures_talk').collection('users');

export async function POST(request: Request) {
    const user = await request.json() as User
    if (!user.email || !user.password) {
        return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }
    const savedUser = await userColl.findOne({ email: user.email, username: user.username })

    if (!savedUser) {
        return NextResponse.json({ message: 'User not found' }, { status: 401 });
    }

    const hashedPassword = crypto
        .pbkdf2Sync(user.password, savedUser.salt, 1000, 64, 'sha512')
        .toString('hex');

    if (savedUser.password !== hashedPassword) {
        return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const token = jwt.sign({ sub: savedUser._id, username: user.username, email: user.email }, process.env.ACCESS_TOKEN_SECRET_KEY!!, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ sub: savedUser._id }, process.env.REFRESH_TOKEN_SECRET_KEY!!, { expiresIn: '7d' });

    return NextResponse.json({ token, refreshToken })
}