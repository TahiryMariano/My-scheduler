import { Router } from "express";
import authController from "../controller/authController";

const router = Router()

//login routes
router.post('/login', authController.login)
router.put('/logout', authController.logout)

export default router;