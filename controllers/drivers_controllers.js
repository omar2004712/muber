const Driver = require("../models/driver");

module.exports = {
  greeting(req, res) {
    res.send({
      hi: "there",
    });
  },
  create(req, res, next) {
    Driver.create(req.body)
      .then((driver) => {
        res.send(driver);
      })
      .catch(next);
  },
  edit(req, res, next) {
    Driver.findByIdAndUpdate(req.params.id, req.body)
      .then(() => Driver.findById(req.params.id))
      .then((driver) => res.send(driver))
      .catch(next);
  },
  del(req, res, next) {
    Driver.findByIdAndDelete(req.params.id)
      .then((driver) => res.status(204).send(driver))
      .catch(next);
  },
};
