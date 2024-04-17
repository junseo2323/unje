import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017";

export async function connectToDatabase() {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const db = client.db("roomstate");
    console.log("Connected to MongoDB successfully");
    return { db, client };
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}
