const assert = require("assert");
const request = require("supertest");
const app = require("../app");

describe("The express app", () => {
  it("handles a GET request to /api", (done) => {
    request(app)
      .get("/api")
      .end((err, response) => {
        if (err) {
          return;
        }

        assert.deepStrictEqual(response.body, { hi: "there" });
        done();
      });
  });
});
