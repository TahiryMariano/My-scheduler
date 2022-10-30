import { Router } from "express";
import { taskController } from "../controller/taskController";

const router = Router();

router.get("/", taskController.getTask);
router.post("/", taskController.createTask);
router.get("/:id", taskController.getOneTask);
router.put("/:id", taskController.editTask);
router.delete("/:id", taskController.deleteTask);

export default router;