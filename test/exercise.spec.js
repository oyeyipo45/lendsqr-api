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

describe("GET /", () => {
    test("ping application", async () => {
        const response = await request(app).get("/api/v1");
        expect(response.statusCode).toBe(200);
    });
});

describe("POST /register", () => {
    test("creates user in database", async () => {
        const username = 'efgh11';
        const user = {
          username: 'efgh11',
          first_name: 'ef',
          last_name: 'gh',
          email: 'efgh11@gmail.com',
          password: '1234567',
        };
        const response = await request(app)
            .post(`/api/Users`)
            .send(user);

        const createdUser = await knex('Users')
            .where({ username: username });

        expect(response.statusCode).toBe(201);
        expect(createdUser[0]).toMatchObject(user);
    });
});

describe("GET /api/v1/user", () => {
    test("returns full details for a user", async () => {
        const response = await request(app).get("/api/v1/user");
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject({...user[0], transaction, ...wallet[0]});
        expect(Array.isArray(response.body)).toBeTruthy();
    });
});


