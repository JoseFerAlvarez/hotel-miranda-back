import supertest from "supertest";
import server from "../src/index";

const request = supertest(server);

describe("Get room", () => {
    it("Get rooms", async () => {
        const res = await request.get("/rooms");

        expect(res.statusCode).toEqual(401);
    })
})
