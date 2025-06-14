export enum Provider {
  NRW = "NRW",
  TLS = "TLS"
}

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