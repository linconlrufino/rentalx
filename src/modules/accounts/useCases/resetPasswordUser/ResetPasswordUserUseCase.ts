import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    refresh_token: string;
    password: string;
}

@injectable()
class ResetPasswordUserUseCase {
    constructor(
        @inject("UserTokensRepository")
        private userTokensRepository: IUserTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
    ) {}

    async execute({ refresh_token, password }: IRequest): Promise<void> {
        const userToken = await this.userTokensRepository.findByRefreshToken(
            refresh_token,
        );

        if (!userToken) {
            throw new AppError("Token invalid!");
        }

        if (
            this.dateProvider.compareIfBefore(
                this.dateProvider.dateNow(),
                userToken.expires_date,
            )
        ) {
            throw new AppError("Token expired!");
        }

        const user = await this.usersRepository.findById(userToken.user_id);

        user.password = await hash(password, 8);

        await this.usersRepository.create(user);

        await this.userTokensRepository.deleteById(userToken.id);
    }
}

export { ResetPasswordUserUseCase };
