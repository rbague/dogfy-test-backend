import { Label, Provider } from "./entity.ts"

export interface GenericProviderRepository {
  generateLabel(provider: Provider): Promise<Label>
}

export interface ProviderRepository {
  generateLabel(): Promise<Label>
}