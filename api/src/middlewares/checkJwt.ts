import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken"
import config from "../config/config";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    //get the jwt token from the head
    const token = req.headers.authorization;
    let jwtPayload;

    //try to validate the token and get data
    try {
        jwtPayload = jwt.verify(token, config.jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        res.status(401).json({
            message: "unauthorized"
        });
        return;
    }

    //the token is valid for 1 hour
    //we want to send a new token on every request

    const { userId, email } = jwtPayload;
    const newToken = jwt.sign({ userId, email }, config.jwtSecret, { expiresIn: 3600 })
    res.setHeader("token", newToken);

    //call the next middleware or controller
    next();
}