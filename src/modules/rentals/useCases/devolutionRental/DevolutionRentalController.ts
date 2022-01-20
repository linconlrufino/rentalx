import { Request, Response } from "express";
import { container } from "tsyringe";

import { DevolutionRentalUseCase } from "./DevolutionRentalUseCase";

class DevolutionRentalController {
    async handle(request: Request, response: Response): Promise<Response> {
        // http://localhost:3333/rentals/devolution/{id}

        const { id } = request.params;

        const devolutionRentalUseCase = container.resolve(
            DevolutionRentalUseCase,
        );

        const rental = await devolutionRentalUseCase.execute({ id });

        return response.status(200).json(rental);
    }
}

export { DevolutionRentalController };
