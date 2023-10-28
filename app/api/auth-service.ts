import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import User from './user';

export function authenticate(request: Request) : User | null {
    const authHeader = request.headers.get('Authorization')
    const token = authHeader && authHeader.split(' ')[1]

    if (token === null) {
        return null
    }

    try {
        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY!!) as User
        console.log(user)
        return user
    } catch(error) {
        console.warn(error)
        return null
    }
}

export function getTokens(user: User) {
    const token = jwt.sign(
        { sub: user._id, username: user.username, email: user.email },
        process.env.ACCESS_TOKEN_SECRET_KEY!!,
        { expiresIn: '15m' }
    )
    const refreshToken = jwt.sign(
        { sub: user._id }, process.env.REFRESH_TOKEN_SECRET_KEY!!,
        { expiresIn: '7d' }
    );
    return {token, refreshToken}
}
