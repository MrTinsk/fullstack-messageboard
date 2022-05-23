import { Router } from "express";
import controllers from "../controllers/messageControllers.js";

const router = Router();

router.post("/create",controllers.createMessage);

router.get("/id/:id", controllers.findMessageById);

router.patch("/edit/:id", controllers.editMessageById);

export default router;
