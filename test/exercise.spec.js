const fs = require('fs');
const request = require("supertest");
const app = require("../src/backend/app");
const knex = require("../src/backend/database");
const testUsers = require('./users');

const performanceDate = new Date().toISOString().replace('T', ' ').split('.')[0].replace('Z', '');

beforeAll(async done => {
    process.env.NODE_ENV = "test";
    await knex.migrate.latest();
    await knex('users').truncate()
    done()
});

beforeEach(async done => {
    await knex.seed.run()
    done()
});

afterEach(async done => {
    await knex('users').truncate()
    done()
});

describe(".env file", () => {
    test("exists", () => {
        let envFile = './.env';
        expect(fs.existsSync(envFile)).toBeTruthy();
    });
});

describe("GET /api/v1", () => {
    test("ping application", async () => {
        const response = await request(app).get("/api/v1");
        expect(response.statusCode).toBe(200);
    });
});

