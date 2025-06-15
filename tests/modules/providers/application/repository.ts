import GenericRepository, { TLSRespository, NRWRespository } from "../../../../src/modules/providers/application/repository.ts"
import { Provider } from "../../../../src/modules/providers/domain/entity.ts"
import { GenericProviderRepository, ProviderRepository, StatusRepository } from "../../../../src/modules/providers/domain/repository.ts"

describe("tls provider repository", () => {
  const repository: ProviderRepository = new TLSRespository()

  test("generates a string label", async () => {
    const response = await repository.generateLabel()
    expect(typeof response).toBe("string")
    expect(response.length).toBeGreaterThan(0)
  })
})

describe("nrw provider repository", () => {
  const repository: ProviderRepository & StatusRepository = new NRWRespository()

  test("generates a string label", async () => {
    const response = await repository.generateLabel()
    expect(typeof response).toBe("string")
    expect(response.length).toBeGreaterThan(0)
  })

  test("retrieves status for label", async () => {
    const response = await repository.getStatus("label")
    expect(typeof response).toBe("string")
    expect(response.length).toBeGreaterThan(0)
  })
})

describe("generic provider repository", () => {
  const repository: GenericProviderRepository = new GenericRepository()

  test("generates a string label for tls provider", async () => {
    const response = await repository.generateLabel(Provider.TLS)
    expect(typeof response).toBe("string")
  })

  test("generates a string label for nrw provider", async () => {
    const response = await repository.generateLabel(Provider.NRW)
    expect(typeof response).toBe("string")
  })
})
