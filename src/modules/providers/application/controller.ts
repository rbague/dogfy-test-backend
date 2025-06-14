import type { Request, Response } from "express"

import { TLSWebhookRequest } from "../domain/dto.ts";
import { StatusCodes } from "http-status-codes";
import { DeliveryRepository } from "../../delivery/domain/repository.ts";
import { Status } from "../../delivery/domain/entity.ts";
import { Provider } from "../domain/entity.ts";

export class TLSWebhookController {
  constructor(private readonly deliveries: DeliveryRepository) {}

  async process(req: Request<{}, {}, TLSWebhookRequest>, res: Response) {
    const { label, status } = req.body
    const delivery = await this.deliveries.find({ label, provider: Provider.TLS })
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
        res.status(StatusCodes.NOT_MODIFIED).json()
        return
    }

    await this.deliveries.update(delivery)
    res.status(StatusCodes.OK).json()
  }
}
