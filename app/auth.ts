import { error } from "console"
import apiClient from "./api_client"
import { Publisher } from "./publisher"

export const tokenPublisher = new Publisher<string | null>(null)

if(typeof window !== 'undefined') {
    tokenPublisher.set(localStorage.getItem('token'))
}

export async function register(username: string, email: string, password: string) {
    const response = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({ username, email, password })
    })
    if (response.status !== 201) {
        throw new Error((await response.json()).message)
    }
}

export async function login(email: string, password: string) {
    const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
    })
    if (response.status !== 200) {
        throw new InvalidCredentials()
    }
    const { token, refreshToken } = await response.json()
    setTokens(token, refreshToken)
}

export async function refreshAccessToken() : Promise<boolean> {
    const refreshToken = localStorage.getItem('refreshToken')
    if (!refreshToken) {
        console.warn('refreshToken missing')
        return false
    }
    if (isTokenExpired(refreshToken)) {
        console.warn('refreshToken expired')
        return false
    }
    const response = await fetch('/api/refresh', {
        method: 'POST',
        body: JSON.stringify({ refreshToken })
    })
    if(response.status !== 200) {
        console.warn('refreshing token failed')
        return false
    }
    const tokens = await response.json()
    setTokens(tokens.token, tokens.refreshToken)
    return true
}

export function isTokenExpired(token: string): boolean {
    console.log(token)
    const expiry = JSON.parse(atob(token.split('.')[1])).exp
    if (expiry - 30 <= Math.floor(Date.now() / 1000)) {
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

