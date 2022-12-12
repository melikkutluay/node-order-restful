const request = require("supertest");
const app = require("../../app");
let token = '';
let order_id
beforeAll(async () => {
  const response = await request(app).post('/user/login')
  .send({
     email: "admin@gmail.com",
     password: "123456"
  });
  token = response.body.token;
});
describe("GET / ", () => {
    test("It should respond with an object of order", async () => {
        const response = await request(app).get("/orders/")
        .set('Authorization', `Bearer ${token}`);
        order_id = response.body.orders[0]._id
        /*expect(response.body).toEqual({
            "count": 2,
            "orders": [
                {
                    "_id": "6397a22c09725776f5454f55",
                    "product": "6397a1f709725776f5454f54",
                    "quantity": 2,
                    "request": {
                        "type": "GET",
                        "url": "http://localhost:3000/orders/6397a22c09725776f5454f55"
                    }
                },
                {
                    "_id": "6397a2ae7df0567a3c332151",
                    "product": "6397a1f709725776f5454f54",
                    "quantity": 2,
                    "request": {
                        "type": "GET",
                        "url": "http://localhost:3000/orders/6397a2ae7df0567a3c332151"
                    }
                }
            ]
        });*/
        expect(response.statusCode).toBe(200);
    });
});

describe("POST / ", () => {
    test("It should respond with an object of order", async () => {
        const response = await request(app).post("/orders/")
        .send({
            "productId": "6397a1f709725776f5454f54",
            "quantity": "2"
        })
        .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(201);
    });
});

describe("GET / ", () => {
    test("It should respond with an object of order", async () => {
        const response = await request(app).get(`/orders/${order_id}`)
        .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
    });
});

describe("POST / ", () => {
    test("It should respond with an object of order", async () => {

        const response = await request(app).post(`/orders/${order_id}`)
        .send({
            "productId": "6397a1f709725776f5454f54",
            "quantity": "2"
        })
        .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(201);
    });
});

describe("DELETE / ", () => {
    test("It should respond with an object of order", async () => {
        const response = await request(app).delete(`/orders/${order_id}`)
        .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
    });
});