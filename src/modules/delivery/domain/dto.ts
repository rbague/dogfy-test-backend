import { Provider, Status } from "./entity.ts"

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