import { redirect } from "next/navigation"
import apiClient from "./api_client"
import { PubSub } from "./pubsub"

export const tokenPublisher = new PubSub(localStorage.getItem('token'))

export async function register(username: string, email: string, password: string) {
    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({ username, email, password })
        })
        if (response.status !== 201) {
            throw new Error((await response.json()).message)
        }
    } catch (_) {
        redirect('/error')
    }
}

export async function login(email: string, password: string) {
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        })
        if (response.status !== 200) {
            throw new InvalidCredentials()
        }
        const { token, refreshToken } = await response.json()
        setTokens(token, refreshToken)
    } catch (_) {
        redirect('/error')
    }
}

export async function refreshAccessToken() {
    const refreshToken = localStorage.getItem('refreshToken')
    if (!refreshToken) {
        redirect('/login')
    }
    if (isTokenExpired(refreshToken)) {
        redirect('/login')
    }
    try {
        const response = await fetch('/refresh', {
            method: 'POST',
            body: JSON.stringify({ refreshToken })
        })
        if(response.status !== 200) {
            redirect('/legin')
        }
        const { token, newRefreshToken } = await response.json()
        setTokens(token, newRefreshToken)
    } catch (_) {
        redirect('/login')
    }
}

export function isTokenExpired(token: string): boolean {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp
    if (expiry - 30 >= Date.now()) {
        return true
    }
    return false
}

function setTokens(token: string, refreshToken: string) {
    localStorage.setItem('token', token)
    localStorage.setItem('refreshToken', refreshToken)
    tokenPublisher.set(token)
}

export class InvalidCredentials extends Error {
    constructor() {
        super('Invalid credentials');
    }
}

