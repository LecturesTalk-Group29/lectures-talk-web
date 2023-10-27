import axios from 'axios'
import { MongoClient } from 'mongodb';

export async function createEmbedding(text: String) { //function to take in any text and sends it to the openai embedding ada 002 model to return embeddings
    const url = 'https://api.openai.com/v1/embeddings';
    const openai_key =process.env.OPENAI_API_KEY; // Replace with your OpenAI key.

    // Call OpenAI API to get the embeddings.
    let response = await axios.post(url, {
        input: text,
        model: "text-embedding-ada-002"
    }, {
        headers: {
            'Authorization': `Bearer ${openai_key}`,
            'Content-Type': 'application/json'
        }
    });
    const [{ embedding }] = response.data?.data
    console.log('embedding', embedding)
    return embedding
}


export async function findSimilarDocuments(embedding: any) {
    const client = new MongoClient(`mongodb+srv://dbUser:${process.env.MONGO_DB_USER_PASSWORD}@cluster0.knhtl54.mongodb.net/?retryWrites=true&w=majority`)
    try {
        await client.connect();

        const db = client.db('lectures_talk');
        const collection = db.collection('trigger_test');

        // Query for similar documents.
        const documents = await collection.aggregate([
            {
                $search: {
                    knnBeta: {
                        vector: embedding,
                        //this is the path to the embedding field in mongo document upload
                        //https://www.mongodb.com/docs/atlas/atlas-search/field-types/knn-vector/
                        path: 'embeddedData ',
                        k: 5,
                    },
                },
            },
            {
                $project: {
                    description: 1, // i dont know if i can change this, but it was set to 1 in the tutorial docs
                    score: { $meta: 'searchscore' }
                },
            },
        ]).toArray()

        return documents[0] // will fix later, just a lazy way to get highest metascore for the time being

    } catch {
        const returnNoDoc = "No Context given"
        return returnNoDoc
    } finally {
        await client.close();
    }
}

export async function uploadDoc(docTextI: any) {
    const client = new MongoClient(`mongodb+srv://dbUser:${process.env.MONGO_DB_USER_PASSWORD}@cluster0.knhtl54.mongodb.net/?retryWrites=true&w=majority`);
    await client.connect();
    console.log("connected")
    const db = client.db('lectures_talk'); // Replace with your database name.
    const collection = db.collection('trigger_test'); // Replace with your collection name.
    const embeddedData = await createEmbedding(docTextI)
    console.log("created embedding")
    const doc = {
        title: "test doc",
        text: docTextI,
        embedding: [{ embeddedData }]
    }
    const result = await collection.insertOne(doc)
    await client.close()
    console.log("inserted")
}

export async function generateGPTResponse(query: any) {
    const gptPrompt = (query);

    if (!query) {
        return { error: 'Message is required in the request body' };
    }

    try {
        const endpoint = 'https://api.openai.com/v1/chat/completions';

        const response = await axios.post(endpoint, {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: gptPrompt }],
            temperature: 0.7,
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        const content = response.data.choices[0].message.content;
        return { content };
    } catch (error) {
        console.error('Error:', error);
        return { error: 'Internal Server Error' };
    }
}
