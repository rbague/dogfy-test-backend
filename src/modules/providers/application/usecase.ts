import { UseCase } from "../../../shared/domain/usecase.ts";
import { Status } from "../../delivery/domain/entity.ts";
import { DeliveryRepository } from "../../delivery/domain/repository.ts";
import { Provider } from "../domain/entity.ts";
import { StatusRepository } from "../domain/repository.ts";

export class NRWDeliveryStatusUpdate implements UseCase {
  constructor (
    private readonly statusRepository: StatusRepository,
    private readonly deliveryRepository: DeliveryRepository
  ) {}

  async execute() {
    const deliveries = await this.deliveryRepository.filter({ provider: Provider.NRW, status: { "$ne": Status.FINISHED }})
    for (const delivery of deliveries) {
      const status = await this.statusRepository.getStatus(delivery.label)
      switch (status) {
        case "RECEIVED":
          delivery.status = Status.CREATED
          break
        case "PROCESSING":
          delivery.status = Status.SHIPPED
          break
        case "TRANSIT":
          delivery.status = Status.DELIVERING
          break
        case "DELIVERED":
          delivery.status = Status.FINISHED
          break
        default:
          return
      }

      await this.deliveryRepository.update(delivery)
    }
  }
}