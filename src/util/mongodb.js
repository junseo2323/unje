import { MongoClient } from "mongodb";

const uri = "mongodb+srv://hunseol03:hunhun0523@unjepr.glrjd6t.mongodb.net/?retryWrites=true&w=majority&appName=unjepr";

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
