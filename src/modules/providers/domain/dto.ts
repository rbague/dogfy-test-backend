import { Label, Status } from "./entity.ts";

export interface TLSWebhookRequest {
  label: Label,
  status: Status
}
