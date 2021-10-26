import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;

describe("Create Car", () => {
    beforeEach(() => {
        createCarUseCase = new CreateCarUseCase();
    });

    it("should be able to create a new car", async () => {
        await createCarUseCase.execute({
            name: "teste",
            description: "",
            daily_rate: 1,
            license_plate: "",
            fine_amount: 2,
            brand: "",
            category_id: "",
        });
    });
});
