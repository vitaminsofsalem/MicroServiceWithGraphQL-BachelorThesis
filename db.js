import { MongoClient } from "mongodb";
import Promise from "bluebird";

// package used to make all MongoClient promise based so we can handle callbacks easily using async / await
Promise.promisifyAll(MongoClient);

const MONGO_URI = "mongodb+srv://amrshawki:amrshawki2001@cluster0.ahhd9iy.mongodb.net/JacksonStores";
const MONGO_DB_NAME = "JacksonStores";
let dbConnection;

// connection initialization function
const connect = async () => {
  try {
    const client = await MongoClient.connect(MONGO_URI);
    dbConnection = client.db(MONGO_DB_NAME);
  } catch (e) {
    throw new Error(`Could not establish database connection: ${e}`);
  }
};

// exported function that connects to DB, returns collection we'll use to push to in scrape.js
const mongoClient = async (collectionName) => {
  if (!dbConnection) {
    await connect();
  }
  if (collectionName) {
    return dbConnection.collection(collectionName);
  }
  return dbConnection;
};

export default mongoClient;