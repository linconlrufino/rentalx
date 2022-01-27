import { ICreateUserTokensDTO } from "@modules/accounts/dtos/ICreateUserTokensDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";

import { IUserTokensRepository } from "../IUserTokensRepository";

class UserTokensRepositoryInMemory implements IUserTokensRepository {
    usersTokens: UserTokens[] = [];

    async create({
        expires_date,
        user_id,
        refresh_token,
    }: ICreateUserTokensDTO): Promise<UserTokens> {
        const userToken = new UserTokens();

        Object.assign(userToken, {
            user_id,
            refresh_token,
            expires_date,
        });

        this.usersTokens.push(userToken);

        return userToken;
    }

    async findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string,
    ): Promise<UserTokens> {
        return this.usersTokens.find(
            userToken =>
                userToken.user_id === user_id &&
                userToken.refresh_token === refresh_token,
        );
    }

    async deleteById(id: string): Promise<void> {
        const userTokenIndex = this.usersTokens.findIndex(
            userToken => userToken.id === id,
        );
        this.usersTokens.splice(userTokenIndex);
    }

    async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
        return this.usersTokens.find(
            userToken => userToken.refresh_token === refresh_token,
        );
    }
}

export { UserTokensRepositoryInMemory };
