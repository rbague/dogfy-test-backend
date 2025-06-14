import crypto from "node:crypto"

import { Provider, Label } from "../domain/entity.ts";
import { GenericProviderRepository, ProviderRepository } from "../domain/repository.ts";

export default class implements GenericProviderRepository {
  private readonly nrw: ProviderRepository;
  private readonly tls: ProviderRepository;

  constructor() {
    this.nrw = new NRWRespository()
    this.tls = new TLSRespository()
  }

  generateLabel(provider: Provider): Promise<Label> {
    switch (provider) {
      case Provider.NRW:
        return this.nrw.generateLabel()
      case Provider.TLS:
        return this.tls.generateLabel()
    }
  }
}

export class NRWRespository implements ProviderRepository {
  generateLabel(): Promise<Label> {
    const str = crypto.randomBytes(8).toString("hex");
    return Promise.resolve(str)
  }
}

export class TLSRespository implements ProviderRepository {
  generateLabel(): Promise<Label> {
    const str = Math.random().toString(36).slice(2)
    return Promise.resolve(str)
  }
}