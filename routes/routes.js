const express = require("express");
const { greeting } = require("../controllers/drivers_controllers");
const router = express();

router.get("/api", greeting);

module.exports = router;
