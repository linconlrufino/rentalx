import { Specification } from "../infra/typeorm/entities/Specification";

interface ICreateEspecificationDTO {
    name: string;
    description: string;
}

interface ISpecificationsRepository {
    create({
        name,
        description,
    }: ICreateEspecificationDTO): Promise<Specification>;
    findByName(name: string): Promise<Specification>;
    findByIds(ids: string[]): Promise<Specification[]>;
}

export { ISpecificationsRepository, ICreateEspecificationDTO };
