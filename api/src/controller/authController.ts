import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken"
import config from "../config/config";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

class authController {
    static login = async (req: Request, res: Response, next: NextFunction) => {
        //check if username and password are set
        let { email, password } = req.body;
        if (!email || !password) {
            res.status(401).json({
                err: true,
                msg: "you should provide a valid email and password"
            })
        }

        //get user from database
        const userRepository = AppDataSource.getRepository(User);
        let user;
        try {
            user = await userRepository.findOneOrFail({ where: { email: email } })
        } catch (error) {
            res.status(401).send()
        }

        //check if encrypted password match
        if (!user.checkIfUnencryptedPasswordIsValid(password)) {
            res.status(401).send();
            return;
        }

        //sign JWT valid for 1 hour
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            config.jwtSecret,
            { expiresIn: 3600 }
        );

        //ssend the jwt in the response
        res.status(200)
            .json({
                user: {
                    id: user.id,
                    email: user.email
                },
                message: "Login successfully",
                accessToken: token
            })
    }

    static logout = async (req: Request, res: Response, next: NextFunction) => {
        const autHeader = req.headers.authorization;
        jwt.sign(autHeader, "", { expiresIn: 1 }, (logout, err) => {
            if (logout) {
                res.send({ msg: "you have been logged out" });
            } else {
                res.send({ msg: 'error' })
            }
        })
    }
}

export default authController;