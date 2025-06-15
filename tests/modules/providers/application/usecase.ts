import { UseCase } from "../../../../src/shared/domain/usecase.ts";
import { StatusRepository } from "../../../../src/modules/providers/domain/repository.ts";
import { DeliveryRepository } from "../../../../src/modules/delivery/domain/repository.ts";
import { NRWDeliveryStatusUpdate } from "../../../../src/modules/providers/application/usecase.ts";
import { Status as ProviderStatus, Provider } from "../../../../src/modules/providers/domain/entity.ts";
import { Status as DeliveryStatus } from "../../../../src/modules/delivery/domain/entity.ts";
import { Delivery } from "../../../../src/modules/delivery/domain/entity.ts";

describe("nrw status update via polling", () => {
  const provider: Provider = Provider.NRW
  let getStatusMock: jest.Mock;
  let deliveryFilterMock: jest.Mock;
  let deliveryUpdateMock: jest.Mock;
  let usecase: UseCase

  beforeEach(() => {
    getStatusMock = jest.fn(label => {
      const statuses = Object.keys(ProviderStatus)
      const status = statuses[Math.floor(Math.random() * statuses.length)] as ProviderStatus
      return Promise.resolve(status)
    })
    deliveryFilterMock = jest.fn(query => {
      const delivery: Delivery = {
        id: "0000000000aaaa",
        name: "delivery",
        label: "label",
        provider: provider,
        status: DeliveryStatus.CREATED
      }
      return Promise.resolve([delivery])
    })
    deliveryUpdateMock = jest.fn(delivery => Promise.resolve(delivery))

    const statusRepositoryMock: StatusRepository = {
      getStatus: getStatusMock,
    }
    const deliveryRepositoryMock: DeliveryRepository = {
      filter: deliveryFilterMock,
      update: deliveryUpdateMock,
      // unused
      list: jest.fn(),
      get: jest.fn(),
      find: jest.fn(),
      create: jest.fn(),
    }

    usecase = new NRWDeliveryStatusUpdate(statusRepositoryMock, deliveryRepositoryMock)
  })

  test("usecase is defined", () => {
    expect(getStatusMock).toBeDefined()
    expect(deliveryFilterMock).toBeDefined()
    expect(deliveryUpdateMock).toBeDefined()
    expect(usecase).toBeDefined()
  })

  test("only updates active provider deliveries", async () => {
    await usecase.execute()
    expect(deliveryFilterMock.mock.calls).toHaveLength(1)
    expect(deliveryFilterMock.mock.calls[0][0]).toBeInstanceOf(Object)
    expect(deliveryFilterMock.mock.calls[0][0]).toMatchObject({ provider: Provider.NRW, status: { "$ne": DeliveryStatus.FINISHED }})
  })

  test("gets status for delivery label", async () => {
    await usecase.execute()
    expect(getStatusMock.mock.calls.length).toBeGreaterThan(0)
    expect(typeof getStatusMock.mock.calls[0][0]).toBe("string")
  })

  test("updates delivery status", async () => {
    await usecase.execute()
    expect(deliveryUpdateMock.mock.calls.length).toBeGreaterThan(0)
    expect(deliveryUpdateMock.mock.calls[0][0]).toBeInstanceOf(Object)
  })
})
