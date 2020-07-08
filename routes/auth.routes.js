const express = require("express");
const router = express.Router();
const mdAuth = require("../middlewares/auth.middleware");
const authController = require("../controllers/auth.controller");
const validations = require("../validations/auth.validation");

router.post(
  "/login",
  validations.validate(validations.loginValidation),
  authController.loginPassenger
);

router.post(
  "/register",
  [
    validations.validate(validations.registerValidation),
    mdAuth.checkIDCard,
    mdAuth.checkPassengerDataByIDcard,
    mdAuth.checkDuplicateData,
  ],
  authController.registerPassenger
);

module.exports = router;
