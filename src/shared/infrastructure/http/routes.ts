import { Router } from "express";
import type { Request, Response } from "express"

import deliveryRouter from "../../../modules/delivery/infrastructure/http/routes.ts";
import providerRouter from "../../../modules/providers/infrastructure/http/routes.ts";

const router = Router()
router.get("/ping", (req: Request, res: Response) => {
  res.status(200).send("pong")
})

router.use("/deliveries", deliveryRouter)
router.use("/providers", providerRouter)

export default router;
