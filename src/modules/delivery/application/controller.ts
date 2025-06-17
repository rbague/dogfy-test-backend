import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Joi from "joi";

import { CreateDeliveryRequest, CreateDeliveryResponse, DeliveryStatusRequest, DeliveryStatusResponse, ListDeliveryResponse } from "../domain/dto.ts";
import { Delivery, Status } from "../domain/entity.ts";
import { DeliveryRepository } from "../domain/repository.ts";
import { Provider } from "../../providers/domain/entity.ts"
import { GenericProviderRepository } from "../../providers/domain/repository.ts";
import { ErrorResponse } from "../../../shared/domain/dto.ts";

export default class DeliveryControler {
  constructor(
    private readonly repository: DeliveryRepository,
    private readonly provider: GenericProviderRepository
  ) {}

  async list(req: Request, res: Response<ListDeliveryResponse>) {
    const response = await this.repository.list()
    res.status(StatusCodes.OK).json({
      deliveries: response.map(it => ({
        id: it.id || "",
        name: it.name,
        provider: it.provider,
        label: it.label
      }))
    })
  }

  async create(req: Request<{}, {}, CreateDeliveryRequest>, res: Response<CreateDeliveryResponse | ErrorResponse>) {
    const schema = Joi.object({ name: Joi.string().required().trim().empty() }).strict()
    const { error, value } = schema.validate(req.body)
    if (error) {
      res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ error: error.toString() })
      return
    }

    const providers = Object.keys(Provider)
    const provider = providers[Math.floor(Math.random() * providers.length)] as Provider
    const delivery: Delivery = {
      name: value.name,
      provider: provider,
      label: await this.provider.generateLabel(provider),
      status: Status.CREATED
    }

    const response = await this.repository.create(delivery)
    res.status(StatusCodes.CREATED).json({
      id: response.id || "",
      name: response.name,
      provider: response.provider,
      label: response.label
    })
  }

  async status(req: Request<DeliveryStatusRequest, {}, {}>, res: Response<DeliveryStatusResponse | ErrorResponse>) {
    const schema = Joi.object({ id: Joi.string().required().trim().empty() }).strict()
    const { error, value } = schema.validate(req.params)
    if (error) {
      res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ error: error.toString() })
      return
    }

    const delivery = await this.repository.get(value.id)
    res.status(StatusCodes.OK).json({
      status: delivery.status
    })
  }
}