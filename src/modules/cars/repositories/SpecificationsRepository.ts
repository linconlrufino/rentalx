import { Specification } from "../model/Specification";
import {
    ICreateEspecificationDTO,
    ISpecificationsRepository,
} from "./ISpecficationsRepository";

class SpecificationRepository implements ISpecificationsRepository {
    private specifications: Specification[];

    constructor() {
        this.specifications = [];
    }

    findByName(name: string): Specification {
        const specificationExists = this.specifications.find(
            x => x.name === name,
        );

        return specificationExists;
    }

    create({ name, description }: ICreateEspecificationDTO): void {
        const specification = new Specification();

        Object.assign(specification, {
            name,
            description,
            created_at: new Date(),
        });

        this.specifications.push(specification);
    }
}

export { SpecificationRepository };
