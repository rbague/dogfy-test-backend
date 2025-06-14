import { ObjectId } from "mongodb";
import MongoRepository from "../../../shared/repositories/mongodb_repository.ts"

import { Delivery } from "../domain/entity.ts";
import { DeliveryRepository } from "../domain/repository.ts"

export default class extends MongoRepository implements DeliveryRepository {
  get(id: string): Promise<Delivery> {
    return new Promise(resolve => {
      this.collection.findOne<Delivery>({ _id: new ObjectId(id) }).then(response => {
        if (response) resolve(response)
      })
    })
  }

  create(delivery: Delivery): Promise<Delivery> {
    return this.collection.insertOne(delivery).then(result => {
      delivery.id = result.insertedId.toString()
      return delivery
    })
  }

  update(delivery: Delivery): Promise<Delivery> {
    return this.collection.updateOne({ _id: new ObjectId(delivery.id) }, delivery).then(result => {
      return delivery
    })
  }
}
