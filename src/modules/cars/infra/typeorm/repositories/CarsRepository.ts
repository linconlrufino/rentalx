import { getRepository, Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>;

    constructor() {
        this.repository = getRepository(Car);
    }

    async create({
        brand,
        category_id,
        daily_rate,
        license_plate,
        description,
        fine_amount,
        name,
        specifications,
        id,
    }: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            brand,
            category_id,
            daily_rate,
            license_plate,
            description,
            fine_amount,
            name,
            specifications,
            id,
        });

        await this.repository.save(car);

        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({ license_plate });

        return car;
    }

    async findAvailable(
        brand?: string,
        category_id?: string,
        name?: string,
    ): Promise<Car[]> {
        const carsQUery = await this.repository
            .createQueryBuilder("c")
            .where("available = :available", { available: true });

        if (brand) {
            carsQUery.andWhere("c.brand = :brand", { brand });
        }

        if (name) {
            carsQUery.andWhere("c.name = :name", { name });
        }

        if (category_id) {
            carsQUery.andWhere("c.category_id = :category_id", { category_id });
        }

        const cars = await carsQUery.getMany();

        return cars;
    }

    async findById(id: string): Promise<Car> {
        const car = this.repository.findOne(id);
        return car;
    }

    async updateAvailable(id: string, available: boolean): Promise<void> {
        await this.repository
            .createQueryBuilder()
            .update()
            .set({ available })
            .where("id = :id")
            .setParameters({ id })
            .execute();

        // Update cars set available = 'true' where id = :id
    }
}

export { CarsRepository };
