import { Request, Response } from "express";
import * as jwt from "jsonwebtoken"
import config from "../config/config";
import { AppDataSource } from "../data-source";
import { Task } from "../entity/Task";

export class taskController {

    static getTask = async (req: Request, res: Response) => {
        const taskRepository = AppDataSource.getRepository(Task);
        const result = await taskRepository.find();
        return res.json(result);
    }


    static createTask = async (req: Request, res: Response) => {
        const token = req.headers.authorization;
        let jwtPayload;
        try {
            jwtPayload = jwt.verify(token, config.jwtSecret)
            res.locals.jwtPayload = jwtPayload;
        } catch (error) {
            res.status(401)
        }

        const { userId } = jwtPayload
        const newTask = {
            name: req.body.name,
            description: req.body.description,
            creator: userId,
            participants: req.body.participants,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            priority: req.body.priority,
            beforeStartingNotificationTime: req.body.beforeStartingNotificationTime
        };

        const taskRepository = AppDataSource.getRepository(Task);
        const task = taskRepository.create(newTask)
        const result = await taskRepository.save(task);
        return res.json(result)
    }

    static getOneTask = async (req: Request, res: Response) => {
        const taskRepository = AppDataSource.getRepository(Task);
        const id = parseInt(req.params.id, 10);
        const result = await taskRepository.findOne({ where: { id: id } });
        return res.json(result);
    }

    static editTask = async (req: Request, res: Response) => {
        const taskRepository = AppDataSource.getRepository(Task);
        const id = parseInt(req.params.id, 10);
        const task = await taskRepository.findOne({ where: { id: id } });
        if (task) {
            taskRepository.merge(task, req.body);
            const result = taskRepository.save(task);
            return res.json(result);
        }
        return res.json({
            message: "task not found"
        })
    }

    static deleteTask = async (req: Request, res: Response) => {
        const taskRepository = AppDataSource.getRepository(Task);
        const id = parseInt(req.params.id, 10);
        let task;
        try {
            task = await taskRepository.findOne({ where: { id: id } });
        } catch (error) {
            res.status(404).send("task not found");
            return;
        }
        taskRepository.delete(task);
        res.status(204).send();
    }
}