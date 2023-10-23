import { ObjectId } from "mongodb";

export default interface User {
    _id: ObjectId,
    username: string,
    email: string,
    password: string,
    salt: string
}