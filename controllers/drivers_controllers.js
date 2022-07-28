const Driver = require("../models/driver");

module.exports = {
  greeting(req, res) {
    res.send({
      hi: "there",
    });
  },
  index(req, res, next) {
    const { lng, lat } = req.query;

    Driver.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          maxDistance: 200000,
          spherical: true,
          distanceField: "distance",
          query: { driving: true },
        },
      },
    ])
      .then((drivers) => {
        res.send(drivers);
      })
      .catch(next);
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
