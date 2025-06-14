import { Label, Status, Provider } from "./entity.ts"

export interface GenericProviderRepository {
  generateLabel(provider: Provider): Promise<Label>
}

export interface ProviderRepository {
  generateLabel(): Promise<Label>
}

export interface StatusRepository {
  getStatus(label: Label): Promise<Status>
}