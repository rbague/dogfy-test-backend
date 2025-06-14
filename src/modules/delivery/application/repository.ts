import { ObjectId } from "mongodb";
import MongoRepository from "../../../shared/repositories/mongodb_repository.ts"

import { Delivery } from "../domain/entity.ts";
import { DeliveryRepository } from "../domain/repository.ts"

export default class extends MongoRepository implements DeliveryRepository {
  list(): Promise<Delivery[]> {
    return new Promise(resolve => {
      const documents = this.collection.find({}).map<Delivery>(doc => ({
          id: doc._id.toString(),
          name: doc.name,
          provider: doc.provider,
          status: doc.status,
          label: doc.label,
      })).toArray()
      resolve(documents)
    })
  }
  get(id: string): Promise<Delivery> {
    return new Promise(resolve => {
      this.collection.findOne({ _id: new ObjectId(id) }).then(response => {
        if (response) resolve({
          id: response._id.toString(),
          name: response.name,
          provider: response.provider,
          status: response.status,
          label: response.label,
        })
      })
    })
  }
  find(query: object): Promise<Delivery> {
    return new Promise(resolve => {
      this.collection.findOne(query).then(response => {
        if (response) resolve({
          id: response._id.toString(),
          name: response.name,
          provider: response.provider,
          status: response.status,
          label: response.label,
        })
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
    return this.collection.updateOne({ _id: new ObjectId(delivery.id) }, { "$set": { status: delivery.status } }).then(result => {
      return delivery
    })
  }
}
