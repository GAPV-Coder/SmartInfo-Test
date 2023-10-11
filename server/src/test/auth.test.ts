import request from "supertest";
import { app } from "../index";
import { expect } from "chai";

describe("Auth routes", () => {
    describe("POST /auth/login", () => {
        it("should log in an existing user and return a token", async () => {
            const res = await request(app)
                .post("/auth/login")
                .send({
                    email: "test@example.com",
                    password: "password123",
                })
                .expect(200);

            expect(res.body).to.haveOwnProperty("token");
        });

        it("should return a 401 error if email is incorrect", async () => {
            const res = await request(app)
                .post("/auth/login")
                .send({
                    email: "wrong@example.com",
                    password: "password123",
                })
                .expect(401);

            expect(res.body).to.haveOwnProperty("error");
        });

        it("should return a 401 error if password is incorrect", async () => {
            const res = await request(app)
                .post("/auth/login")
                .send({
                    email: "test@example.com",
                    password: "wrongpassword",
                })
                .expect(401);

            expect(res.body).to.haveOwnProperty("error");
        });
    });

    describe("POST /auth/register", () => {
        it("should register a new user and return a token", async () => {
            const res = await request(app)
                .post("/auth/register")
                .send({
                    name: "John Doe",
                    email: "johndoe@example.com",
                    password: "password123",
                })
                .expect(201);

            expect(res.body).to.haveOwnProperty("token");
        });

        it("should return a 400 error if name is missing", async () => {
            const res = await request(app)
                .post("/auth/register")
                .send({
                    email: "johndoe@example.com",
                    password: "password123",
                })
                .expect(400);

            expect(res.body).to.haveOwnProperty("error");
        });

        it("should return a 400 error if email is missing", async () => {
            const res = await request(app)
                .post("/auth/register")
                .send({
                    name: "John Doe",
                    password: "password123",
                })
                .expect(400);

            expect(res.body).to.haveOwnProperty("error");
        });

        it("should return a 400 error if password is missing", async () => {
            const res = await request(app)
                .post("/auth/register")
                .send({
                    name: "John Doe",
                    email: "johndoe@example.com",
                })
                .expect(400);

            expect(res.body).to.haveOwnProperty("error");
        });

        it("should return a 400 error if email is invalid", async () => {
            const res = await request(app)
                .post("/auth/register")
                .send({
                    name: "John Doe",
                    email: "invalidemail",
                    password: "password123",
                })
                .expect(400);

            expect(res.body).to.haveOwnProperty("error");
        });

        it("should return a 400 error if password is too short", async () => {
            const res = await request(app)
                .post("/auth/register")
                .send({
                    name: "John Doe",
                    email: "johndoe@example.com",
                    password: "short",
                })
                .expect(400);

            expect(res.body).to.haveOwnProperty("error");
        });

        it("should return a 400 error if email is already registered", async () => {
            const res = await request(app)
                .post("/auth/register")
                .send({
                    name: "John Doe",
                    email: "johndoe@example.com",
                    password: "password123",
                })
                .expect(400);

            expect(res.body).to.haveOwnProperty("error");
        });
    });
});
