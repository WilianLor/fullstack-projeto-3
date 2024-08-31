import { Router } from "express";

import authRoutes from "./modules/auth";
import domainRoutes from "./modules/domain";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/domain", domainRoutes);

export default routes;
