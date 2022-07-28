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
  it("GET to /api/drivers finds drivers in a location", (done) => {
    const driver1 = new Driver({
      email: "driver1@test.com",
      driving: true,
      geometry: { type: "Point", coordinates: [0, 0.1] },
    });

    const driver2 = new Driver({
      email: "driver2@test.com",
      geometry: { type: "Point", coordinates: [0, 30] },
    });

    // driver1.save().then(() => {
    //   request(app)
    //     .get("/api/drivers?lat=80&lng=20")
    //     .end((err, res) => {
    //       console.log(res);
    //       done();
    //     });
    // });
    Promise.all([driver1.save(), driver2.save()])
      .then(() => {
        request(app)
          .get("/api/drivers?lng=0&lat=0")
          .end((err, response) => {
            assert.strictEqual(response.body[0].email, "driver1@test.com");
            assert.strictEqual(response.body.length, 1);
            done();
          });
      })
      .catch((err) => console.log(err));
  });
});
