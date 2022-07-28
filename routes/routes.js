const express = require("express");
const {
  greeting,
  create,
  edit,
} = require("../controllers/drivers_controllers");
const router = express();

router.get("/api", greeting);

router.post("/api/drivers", create);

router.put("/api/drivers/:id", edit);

module.exports = router;
