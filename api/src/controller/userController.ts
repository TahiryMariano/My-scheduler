import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

export class userController {

    //get all users
    static listAll = async (req: Request, res: Response, next: NextFunction) => {
        const userRepository = AppDataSource.getRepository(User);
        const users = await userRepository.find(
            { select: ["id", "firstname", "lastname", "email"] }
        );

        return res.json(users)
    }

    //get one user
    static getOneById = async (req: Request, res: Response, next: NextFunction) => {
        const id: number = parseInt(req.params.id, 10)
        const userRepository = AppDataSource.getRepository(User);
        try {
            let user = await userRepository.findOneOrFail(
                {
                    select: ["id", "firstname", "lastname", "email"],
                    where: { id: id }
                }
            )
            res.json(user)
        } catch (error) {
            res.status(404).send("user not found");
        }
    }

    //create new user
    static createUser = async (req: Request, res: Response, next: NextFunction) => {
        const { firstname, lastname, email, password } = req.body;
        let user = new User();
        user.firstname = firstname;
        user.lastname = lastname;
        user.email = email;
        user.password = password;

        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(400).send(errors);
        }
        user.hashPassword();

        const userRepository = AppDataSource.getRepository(User)
        try {
            await userRepository.save(user)
        } catch (error) {
            res.status(409).send("email already in user")
        }

        //OK
        res.status(201).send("user created successfully")
    }

    //edit user
    static editUser = async (req: Request, res: Response, next: NextFunction) => {
        const id: number = parseInt(req.params.id, 10);
        const { firstname, lastname, email } = req.body;
        const userRepository = AppDataSource.getRepository(User);
        let user;
        try {
            user = await userRepository.findOneBy({ id: id })
        } catch (error) {
            res.status(404).send("user not found");
            return;
        }

        user.firstname = firstname;
        user.lastname = lastname;
        user.email = email;
        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        try {
            await userRepository.save(user)
        } catch (error) {
            res.status(409).send("email already in use")
        }

        res.status(204).send();
    }

    //delete user
    static deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        const id: number = parseInt(req.params.id, 10);
        const userRepository = AppDataSource.getRepository(User);
        let user;
        try {
            user = await userRepository.findOneBy({ id: id })
        } catch (error) {
            res.status(404).send("not found");
            return;
        }
        userRepository.delete(id);

        res.status(204).send();
    }
};

export default userController;