import { Delivery } from "./entity.ts"

export interface DeliveryRepository {
  list(): Promise<Delivery[]>
  get(id: string): Promise<Delivery>
  find(query: object): Promise<Delivery>
  create(delivery: Delivery): Promise<Delivery>
  update(id: Delivery): Promise<Delivery>
}
