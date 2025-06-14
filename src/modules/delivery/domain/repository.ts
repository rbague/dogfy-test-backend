import { Delivery } from "./entity.ts"

export interface DeliveryRepository {
  list(): Promise<Delivery[]>
  get(id: string): Promise<Delivery>
  create(delivery: Delivery): Promise<Delivery>
  update(delivery: Delivery): Promise<Delivery>
}
