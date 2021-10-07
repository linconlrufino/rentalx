import { Router } from "express";

import { AuthenticateUseController } from "../modules/accounts/useCases/authenticateUser/AuthenticateUserController";

const authenticateRoutes = Router();

const authenticateUseController = new AuthenticateUseController();

authenticateRoutes.post("/sessions", authenticateUseController.handle);

export { authenticateRoutes };
