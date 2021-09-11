import { Router } from "express";
import { v4 as uuidV4 } from "uuid";

const categoriesRoutes = Router();

const categories = [];

categoriesRoutes.post("/", (request, response) => {
    const { name, description } = request.body;

    const cateogory = {
        name,
        description,
        id: uuidV4(),
        date: "teste",
    };

    categories.push(cateogory);

    return response.status(201).json(cateogory);
});

export { categoriesRoutes };
