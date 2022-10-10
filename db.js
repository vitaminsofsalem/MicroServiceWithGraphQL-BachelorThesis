import { MongoClient } from "mongodb";
import Promise from "bluebird";
import * as dotenv from 'dotenv';
dotenv.config()

Promise.promisifyAll(MongoClient);

const { MONGO_URI, MONGO_DB_NAME } = process.env;
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
