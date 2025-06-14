import { Delivery } from "./entity.ts"

export interface DeliveryRepository {
  list(): Promise<Delivery[]>
  filter(query: object): Promise<Delivery[]>
  get(id: string): Promise<Delivery>
  find(query: object): Promise<Delivery>
  create(delivery: Delivery): Promise<Delivery>
  update(delivery: Delivery): Promise<Delivery>
}
