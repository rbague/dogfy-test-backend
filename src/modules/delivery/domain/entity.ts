import { Provider } from "../../providers/domain/entity.ts"

export enum Status {
  CREATED = "CREATED",
  SHIPPED = "SHIPPED",
  DELIVERING = "DELIVERING",
  FINISHED = "FINISHED"
}

export interface Delivery {
  id?: string,
  name: string,
  provider: Provider
  label: string,
  status: Status
}