// eslint-disable-next-line import/no-extraneous-dependencies
import request from "supertest";

import { app } from "@shared/infra/http/app";

describe("Create Category Controller", () => {
    it("test", async () => {
        await request(app).get("/cars/available").expect(200);
    });
});
