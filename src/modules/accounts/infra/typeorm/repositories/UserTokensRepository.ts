import { getRepository, Repository } from "typeorm";

import { ICreateUserTokensDTO } from "@modules/accounts/dtos/ICreateUserTokensDTO";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";

import { UserTokens } from "../entities/UserTokens";

class UserTokensRepository implements IUserTokensRepository {
    private repository: Repository<UserTokens>;

    constructor() {
        this.repository = getRepository(UserTokens);
    }

    async create({
        expires_date,
        user_id,
        refresh_token,
    }: ICreateUserTokensDTO): Promise<UserTokens> {
        const userToken = this.repository.create({
            expires_date,
            user_id,
            refresh_token,
        });

        await this.repository.save(userToken);

        return userToken;
    }

    async findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string,
    ): Promise<UserTokens> {
        const userTokens = await this.repository.findOne({
            user_id,
            refresh_token,
        });

        return userTokens;
    }

    async deleteById(id: string): Promise<void> {
        this.repository.delete(id);
    }

    async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
        const userTokens = await this.repository.findOne({
            refresh_token,
        });

        return userTokens;
    }
}

export { UserTokensRepository };
