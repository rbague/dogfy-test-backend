import { MongoClient } from "mongodb"

const dsn: string = process.env.MONGODB_DSN || ""
const client = await MongoClient.connect(dsn)

export default client;
export const db = client.db()