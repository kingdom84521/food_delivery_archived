require("./model");

const controller = require("./controller");

const express = require("express");

const router = express.Router();

router.get("/", controller.findOne);

router.post("/register", controller.register);

router.put("/edit", controller.edit);

router.delete("/delete", controller.delete);

module.exports = router;