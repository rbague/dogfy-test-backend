import { Router } from "express";

import { collection } from "../db/mongo/index.ts";
import DeliveryRepository from "../../application/repository.ts";
import DeliveryController from "../../application/controller.ts";

const repository = new DeliveryRepository(collection)
const controller = new DeliveryController(repository)
const router = Router()

router.post("/", (req, res) => controller.create(req, res))
router.get("/:id/status", (req, res) => controller.status(req, res))

export default router;
