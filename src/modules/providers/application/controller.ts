import type { Request, Response } from "express"

import { TLSWebhookRequest } from "../domain/dto.ts";
import { StatusCodes } from "http-status-codes";
import { DeliveryRepository } from "../../delivery/domain/repository.ts";
import { Status } from "../../delivery/domain/entity.ts";
import { Provider } from "../domain/entity.ts";
import Joi from "joi";

export class TLSWebhookController {
  constructor(private readonly deliveries: DeliveryRepository) {}

  async process(req: Request<{}, {}, TLSWebhookRequest>, res: Response) {
    const schema = Joi.object({
      label: Joi.string().required().trim().empty(),
      status: Joi.string().required().trim().empty().valid(...Object.values(Status))
    }).strict()
    const { error, value } = schema.validate(req.body)
    if (error) {
      res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ error: error.toString() })
      return
    }

    const { label, status } = value
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
