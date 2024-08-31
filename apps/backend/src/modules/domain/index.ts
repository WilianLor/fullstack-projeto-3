import { Router } from "express";

import domainController from "./controllers/domain.controller";
import authMiddleware from "../../middlewares/auth.middleware";

const routes = Router();

routes.post("/", authMiddleware, domainController.createDomain);
routes.get("/list-user", authMiddleware, domainController.listUserDomains);
routes.post("/verify-domain", authMiddleware, domainController.verifyDomain);
routes.delete("/:domainId", authMiddleware, domainController.removeDomain);

export default routes;
