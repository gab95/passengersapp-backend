const express = require("express");
const router = express.Router();
const mdAuth = require("../middlewares/auth.middleware");
const passengerController = require("../controllers/passenger.controller");

router.get("/info", mdAuth.tokenVerify, passengerController.getPassengerData);

router.get(
  "/edit",
  mdAuth.tokenVerify,
  passengerController.getPassengerDataByCi
);

router.get(
  "/payments",
  mdAuth.tokenVerify,
  passengerController.getPassengePaymentsByIDCardAndCI
);

router.get(
  "/topups",
  mdAuth.tokenVerify,
  passengerController.getPassengeTopUpsByIDCardAndCI
);

router.put("/edit", mdAuth.tokenVerify, passengerController.updatePassenger);

module.exports = router;
