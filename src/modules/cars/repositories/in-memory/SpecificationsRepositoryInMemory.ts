import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

import {
    ICreateEspecificationDTO,
    ISpecificationsRepository,
} from "../ISpecificationsRepository";

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
    specifications: Specification[] = [];

    async create({
        name,
        description,
    }: ICreateEspecificationDTO): Promise<void> {
        const specification = new Specification();

        Object.assign(Specification, {
            name,
            description,
        });

        this.specifications.push(specification);
    }

    async findByName(name: string): Promise<Specification> {
        return this.specifications.find(
            specification => specification.name === name,
        );
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const allSpecifications = this.specifications.filter(specification =>
            ids.includes(specification.id),
        );

        return allSpecifications;
    }
}

export { SpecificationsRepositoryInMemory };
