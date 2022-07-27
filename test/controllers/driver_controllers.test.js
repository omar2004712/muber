const assert = require("assert");
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../app");

const Driver = mongoose.model("driver");

describe("Drivers controllers", () => {
  it("Post to /api/drivers creates a new driver", (done) => {
    Driver.count().then((firstCount) => {
      request(app)
        .post("/api/drivers")
        .send({ email: "test@test.com" })
        .end(() => {
          Driver.count().then((secondCount) => {
            assert.strictEqual(firstCount + 1, secondCount);
            done();
          });
        });
    });
  });
});
