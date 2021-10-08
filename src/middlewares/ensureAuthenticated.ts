import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../erros/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token missing", 401);
    }

    /*
    [0] = Bearer
    [1] = 12312-242343
    */

    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(
            token,
            "28f72f429d10090783f1aed40551f434",
        ) as IPayload;

        const usersRepository = new UsersRepository();
        const user = usersRepository.findById(user_id);

        if (!user) {
            throw new AppError("User does not exists!", 401);
        }

        request.user = { id: user_id };

        next();
    } catch {
        throw new AppError("Invalid token!", 401);
    }
}
