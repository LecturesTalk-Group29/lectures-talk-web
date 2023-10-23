import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import User from './user';

export default function authenticate(request: Request) : User | null {
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

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2O…A5Mn0.OgsMHTuUG4C4OVX8f-UQ22WirmBrOqc7XrvN--cexBc