import { Specification } from "../../entities/Specification";
import {
    ICreateEspecificationDTO,
    ISpecificationsRepository,
} from "../ISpecficationsRepository";

class SpecificationRepository implements ISpecificationsRepository {
    private specifications: Specification[];

    private static INSTANCE: SpecificationRepository;

    private constructor() {
        this.specifications = [];
    }

    public static getInstance(): SpecificationRepository {
        if (!SpecificationRepository.INSTANCE) {
            SpecificationRepository.INSTANCE = new SpecificationRepository();
        }

        return SpecificationRepository.INSTANCE;
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
