import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { CreateDeliveryRequest, CreateDeliveryResponse, DeliveryStatusRequest, DeliveryStatusResponse } from "../domain/dto.ts";
import { Delivery, Provider, Status } from "../domain/entity.ts";
import { DeliveryRepository } from "../domain/repository.ts";

export default class DeliveryControler {
  constructor(private readonly repository: DeliveryRepository) {}

  async create(req: Request<{}, {}, CreateDeliveryRequest>, res: Response<CreateDeliveryResponse>) {
    const providers = Object.keys(Provider)
    const provider = providers[Math.floor(Math.random() * providers.length)]
    const delivery: Delivery = {
      name: req.body.name,
      provider: provider as Provider,
      label: "test",
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

  async status(req: Request<DeliveryStatusRequest, {}, {}>, res: Response<DeliveryStatusResponse>) {
    const delivery = await this.repository.get(req.params.id)
    res.status(StatusCodes.OK).json({
      status: delivery.status
    })
  }
}