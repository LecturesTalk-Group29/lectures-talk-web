import axios from 'axios'
import { MongoClient, ObjectId } from 'mongodb';

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
    return embedding
}


export async function findSimilarDocuments(embedding: any) {
    const client = new MongoClient(`mongodb+srv://dbUser:${process.env.MONGO_DB_USER_PASSWORD}@cluster0.knhtl54.mongodb.net/?retryWrites=true&w=majority`)
    try {
        console.log("Trying to search collection")
        await client.connect();

        const db = client.db('lectures_talk');
        const collection = db.collection('trigger_test');
        console.log("Connected")

        // Query for similar documents.
        const similarSegments = await collection.aggregate([
            {
              $search: {
                knnBeta: {
                  vector: embedding,
                  path: 'embedding', 
                  k: 5, // Change the value of 'k' to the number of similar segments you want to find
                },
              },
            },
            {
              $project: {
                text: 1, // Return the 'text' field of the segment
                score: { $meta: 'searchScore' },
              },
            },
          ]).toArray();
        console.log("Searched")

        if (similarSegments.length > 0) {
          const highestScoreDoc = similarSegments.reduce((highest, current) => {
            return highest.score > current.score ? highest : current
          })
          console.log(highestScoreDoc);
          return highestScoreDoc.text;
        } else {
          //const returnNoDoc = fetchVideoSummaryText(docID);
          const returnNoDoc = ""
          console.log(returnNoDoc);
          return returnNoDoc;
        }
    } catch (error) {
        console.error("Error occurred:", error);
        return "Error occurred";
    } finally {
        await client.close();
    }
}

async function fetchVideoSummaryText(documentId: string) {
    const client = new MongoClient(
      `mongodb+srv://dbUser:${process.env.MONGO_DB_USER_PASSWORD}@cluster0.knhtl54.mongodb.net/?retryWrites=true&w=majority`
    );
  
    try {
      await client.connect();
      const db = client.db('lectures_talk');
      const collection = db.collection('videos');
      const objectId = new ObjectId(documentId)
  
      const videoDocument = await collection.findOne({ _id: objectId });
  
      if (!videoDocument) {
        return "Document not found";
      }
  
      const summarySegments = videoDocument.summarySegments || [];
      const summaryText = summarySegments.map((segment: { text: any; }) => segment.text).join(' ');
  
      return summaryText;
    } catch (error) {
      console.error("Error occurred:", error);
      return "Error occurred";
    } finally {
      await client.close();
    }
  }
/*
export async function findSimilarDocuments(embedding: any) {
    const client = new MongoClient(`mongodb+srv://dbUser:${process.env.MONGO_DB_USER_PASSWORD}@cluster0.knhtl54.mongodb.net/?retryWrites=true&w=majority`)
    try {
        console.log("Trying to search collection")
        await client.connect();

        const db = client.db('lectures_talk');
        const collection = db.collection('trigger_test');
        console.log("Connected")

        // Query for similar documents.
        const similarSegments = await collection.aggregate([
            {
              $search: {
                knnBeta: {
                  vector: embedding,
                  path: 'embedding', // Assuming your segments have an 'embedding' field
                  k: 5, // Change the value of 'k' to the number of similar segments you want to find
                },
              },
            },
            {
              $project: {
                text: 1, // Return the 'text' field of the segment
                score: { $meta: 'searchScore' },
              },
            },
          ]).toArray();
        console.log("Searched")

        if (similarSegments.length > 0) {
          const highestScoreDoc = similarSegments.reduce((highest, current) => {
            return highest.score > current.score ? highest : current
          })
          console.log(highestScoreDoc);
          return highestScoreDoc.text;
        } else {
          const returnNoDoc = "No similar document found";
          console.log(returnNoDoc);
          return returnNoDoc;
        }
    } catch (error) {
        console.error("Error occurred:", error);
        return "Error occurred";
    } finally {
        await client.close();
    }
}
*/
export async function uploadDoc(doc: any) {
    const client = new MongoClient(`mongodb+srv://dbUser:${process.env.MONGO_DB_USER_PASSWORD}@cluster0.knhtl54.mongodb.net/?retryWrites=true&w=majority`);
    try {
        await client.connect();
        const db = client.db('lectures_talk'); // Replace with your database name.
        const collection = db.collection('trigger_test'); // Replace with your collection name.
        const embeddedData = [];
  
        // Iterate through the document segments
        for (const segment of doc.segments) {
            const embeddedSegment = await embedSegmentText(segment);
            embeddedData.push(embeddedSegment);
        }
  
        const newDoc = {
            _id: doc._id,
            url: doc.url,
            submitter: doc.submitter,
            status: doc.status,
            title: doc.title,
            language: doc.language,
            duration: doc.duration,
            segments: embeddedData,
        };
  
        const result = await collection.insertOne(newDoc);
    } finally {
        await client.close();
    }
  }
  
  async function embedSegmentText(segment: any) {
    const embeddedText = await createEmbedding(segment.text); // Embed the "text" field of the segment
    return { ...segment, embedding: embeddedText };
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
