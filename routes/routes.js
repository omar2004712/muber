const express = require("express");
const { greeting, create } = require("../controllers/drivers_controllers");
const router = express();

router.get("/api", greeting);

router.post("/api/drivers", create);

module.exports = router;
