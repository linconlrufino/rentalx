import { ICreateUserTokensDTO } from "../dtos/ICreateUserTokensDTO";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";

interface IUserTokensRepository {
    create({
        expires_date,
        user_id,
        refresh_token,
    }: ICreateUserTokensDTO): Promise<UserTokens>;
}

export { IUserTokensRepository };
