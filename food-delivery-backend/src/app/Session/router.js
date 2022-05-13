const validateToken = require("../../middlewares/validateToken");
const controller = require("./controller");

const express = require("express");

const router = express.Router();

router.post( "/login", controller.login )

router.get( "/search/restaurants", controller.search )

module.exports = router;