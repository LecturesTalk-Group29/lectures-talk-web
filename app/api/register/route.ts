import crypto from 'crypto'

import dbClient from '../../db';
import { NextResponse } from 'next/server';

const userColl = dbClient.db('lectures_talk').collection('users');

export async function POST(request: Request) {
    const user = await request.json()
    if(!user.email || !user.username || !user.password) {
        return NextResponse.json({message: 'Missing required fields'}, {status: 400});
    }

    let savedUser = await userColl.findOne({ email: user.email })

    if (savedUser) {
        return NextResponse.json({ message: 'Email already in use' }, { status: 409 });
    }

    savedUser = await userColl.findOne({ username: user.username })

    if (savedUser) {
        return NextResponse.json({ message: 'Username already in use' }, { status: 409 });
    }

    user.salt = crypto.randomBytes(16).toString('hex')

    user.password = crypto
        .pbkdf2Sync(user.password, user.salt , 1000, 64, 'sha512')
        .toString('hex');

    try {
        const savedUser = await userColl.insertOne(user)
        return NextResponse.json({message: 'User created'}, {status: 201});
    } catch (error) {
        return NextResponse.json(error, {status: 500});
    }
}