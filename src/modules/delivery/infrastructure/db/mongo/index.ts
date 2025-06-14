import { db } from "../../../../../shared/infrastructure/db/mongo/index.ts";

export const collection = db.collection("deliveries")
