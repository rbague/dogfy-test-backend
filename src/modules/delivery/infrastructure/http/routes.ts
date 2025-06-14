import { Router } from "express";

import { collection } from "../db/mongo/index.ts";
import DeliveryRepository from "../../application/repository.ts";
import DeliveryController from "../../application/controller.ts";
import ProviderRepository from "../../../providers/application/repository.ts";

const repository = new DeliveryRepository(collection)
const provider = new ProviderRepository()
const controller = new DeliveryController(repository, provider)
const router = Router()

router.post("/", (req, res) => controller.create(req, res))
router.get("/:id/status", (req, res) => controller.status(req, res))

export default router;
