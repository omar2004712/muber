const express = require("express");
const {
  greeting,
  create,
  edit,
  del,
  index,
} = require("../controllers/drivers_controllers");
const router = express();

router.get("/api", greeting);

router.post("/api/drivers", create);

router.put("/api/drivers/:id", edit);

router.delete("/api/drivers/:id", del);

router.get("/api/drivers", index);

module.exports = router;
