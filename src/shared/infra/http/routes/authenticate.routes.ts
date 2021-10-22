import { AuthenticateUseController } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserController";
import { Router } from "express";


const authenticateRoutes = Router();

const authenticateUseController = new AuthenticateUseController();

authenticateRoutes.post("/sessions", authenticateUseController.handle);

export { authenticateRoutes };
