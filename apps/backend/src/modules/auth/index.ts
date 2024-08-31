import { Router } from "express";

import authController from "./controllers/auth.controller";

const routes = Router();

routes.post("/login", authController.login);
routes.post("/refresh-token", authController.refreshToken);

export default routes;
