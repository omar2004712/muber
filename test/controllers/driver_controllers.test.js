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
  it("PUT to /api/drivers/:id edits an existing driver", (done) => {
    const driver = new Driver({
      email: "t@t.com",
      driving: false,
    });
    driver.save().then(() => {
      request(app)
        .put(`/api/drivers/${driver._id}`)
        .send({ driving: true })
        .end(() => {
          Driver.findById(driver._id).then((driver) => {
            assert(driver.driving);
            done();
          });
        });
    });
  });
  it("DELETE to /api/drivers/:id can delete a driver", (done) => {
    const driver = new Driver({
      email: "t@t.com",
      driving: false,
    });

    driver.save().then(() => {
      request(app)
        .delete(`/api/drivers/${driver._id}`)
        .end(() => {
          Driver.findById(driver._id).then((driver) => {
            assert(!driver);
            done();
          });
        });
    });
  });
});
