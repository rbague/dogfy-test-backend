import { Collection } from "mongodb";

export default abstract class MongoRepository {
  constructor(public readonly collection: Collection) {}
}
