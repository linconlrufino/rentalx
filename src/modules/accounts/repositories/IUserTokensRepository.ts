import { ICreateUserTokensDTO } from "../dtos/ICreateUserTokensDTO";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";

interface IUserTokensRepository {
    create({
        expires_date,
        user_id,
        refresh_token,
    }: ICreateUserTokensDTO): Promise<UserTokens>;

    findByUserIdAndRefreshToken(
        user_id: string,
        token: string,
    ): Promise<UserTokens>;

    deleteById(id: string): Promise<void>;
}

export { IUserTokensRepository };
