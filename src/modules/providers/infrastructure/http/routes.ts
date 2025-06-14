import { Router } from "express";

import { collection } from "../../../delivery/infrastructure/db/mongo/index.ts";
import DeliveryRepository from "../../../delivery/application/repository.ts";
import { TLSWebhookController } from "../../application/controller.ts";

const deliveryRespository = new DeliveryRepository(collection)
const controller = new TLSWebhookController(deliveryRespository)
const router = Router()

router.post("/webhook/tls", (req, res) => controller.process(req, res))

export default router;
