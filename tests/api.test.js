const request = require("supertest");
const app = require("../app");

jest.setTimeout(100000);

describe("GET / - get lighthouse report", () => {
  it("should not return a falsy value", () => {
    return request(app)
      .get("/")
      .then(res => {
        expect(res.statusCode).toBe(200);
        expect(res.text).toBeTruthy();
      });
  });
});
