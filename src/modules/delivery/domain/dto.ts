import { Status } from "./entity.ts"
import { Provider } from "../../providers/domain/entity.ts"

export interface ListDeliveryResponse {
  deliveries: {
    id: string,
    name: string,
    provider: Provider
    label: string
  }[]
}

export interface CreateDeliveryRequest {
  name: string
}

export interface CreateDeliveryResponse {
  id: string,
  name: string,
  provider: Provider
  label: string
}

export interface DeliveryStatusRequest {
  id: string
}

export interface DeliveryStatusResponse {
  status: Status
}