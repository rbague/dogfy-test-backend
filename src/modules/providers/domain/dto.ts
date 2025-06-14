import { Label } from "./entity.ts";

export interface TLSWebhookRequest {
  label: Label,
  status: "RECEIVED" | "PROCESSING" | "TRANSIT" | "DELIVERED"
}
