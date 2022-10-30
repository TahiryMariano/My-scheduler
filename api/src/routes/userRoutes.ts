import { Router } from "express";
import userController from "../controller/userController";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();

//get all users
router.get("/", checkJwt, userController.listAll);
router.post("/", checkJwt, userController.createUser);
router.delete("/:id", checkJwt, userController.deleteUser);
router.put("/:id", checkJwt, userController.editUser);

export default router;