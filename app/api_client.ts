import { isTokenExpired, refreshAccessToken, tokenPublisher } from "./auth"

const secureEndpoints = ['/lectures']

export default async function apiClient(endpoint: string, method: string, body: string): Promise<any> {
    const request = new Request(`/api${endpoint}`, {
        method,
        body,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if(secureEndpoints.includes(endpoint)) {
        const token = tokenPublisher.value
        if(token && isTokenExpired(token)) {
            if(!await refreshAccessToken()) {
                throw 'Unauthorized'
            }
        }
        request.headers.append('Authorization', `Bearer ${tokenPublisher.value}`)
    }
    
    return await fetch(request)
}
