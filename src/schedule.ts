import cron from "node-cron";

import { collection as deliveryCollection } from "./modules/delivery/infrastructure/db/mongo/index.ts";
import DeliveryRepository from "./modules/delivery/application/repository.ts";
import { NRWDeliveryStatusUpdate } from "./modules/providers/application/usecase.ts";
import { NRWRespository } from "./modules/providers/application/repository.ts";

const statusRepository = new NRWRespository()
const deliveryRespository = new DeliveryRepository(deliveryCollection)

cron.schedule("0 * * * *", () => {
  new NRWDeliveryStatusUpdate(statusRepository, deliveryRespository).execute()
});
