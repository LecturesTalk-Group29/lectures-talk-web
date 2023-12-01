import { ObjectId } from "mongodb";
import { Publisher } from "./publisher";
import { tokenPublisher } from "./auth";

export interface User {
    sub: ObjectId,
    username: string,
    email: string
}

export const userPublisher = new Publisher<User | null>(null)

tokenPublisher.subscribe((token) => {
    if(token === null) {
        userPublisher.set(null)
        return
    }
    userPublisher.set(JSON.parse(atob(token.split('.')[1])) as User)
})
