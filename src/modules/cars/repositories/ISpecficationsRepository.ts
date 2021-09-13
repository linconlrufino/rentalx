import { Specification } from "../model/Specification";

interface ICreateEspecificationDTO {
    name: string;
    description: string;
}

interface ISpecificationsRepository {
    findByName(name: string): Specification;

    create({ name, description }: ICreateEspecificationDTO): void;
}

export { ISpecificationsRepository, ICreateEspecificationDTO };
