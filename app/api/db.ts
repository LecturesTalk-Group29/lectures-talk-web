import { MongoClient } from 'mongodb';

const client = new MongoClient(`mongodb+srv://dbUser:${process.env.MONGO_DB_USER_PASSWORD}@cluster0.knhtl54.mongodb.net/?retryWrites=true&w=majority`)

export default client;