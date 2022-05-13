require("./model");
// const validateToken = require("../../middlewares/validateToken");
const controller = require("./controller");

const express = require("express");

const router = express.Router();

router.post( "/create", controller.order )

router.put( "/update", controller.update )

router.post( "/info", controller.info )

module.exports = router