import { Collection } from "mongodb";

export default abstract class MongoRepository {
  constructor(private readonly collection: Collection) {}
}
