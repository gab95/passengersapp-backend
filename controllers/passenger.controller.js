const Passenger = require("../queries/passenger.queries");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config();

exports.getPassengerData = async (req, res, next) => {
  //get ci from decoded token
  const ci = getCiFromToken(req.headers["x-access-token"]);

  //get the passenger data by ci
  const passengerData = await Passenger.getPassengerData(ci);

  return res.status(200).json({
    passengerData,
  });
};

exports.getPassengerDataByCi = async (req, res, next) => {
  //get ci from decoded token
  const ci = getCiFromToken(req.headers["x-access-token"]);

  //get the passenger data by ci
  const data = await Passenger.getPassengerDataByCi(ci);

  return res.status(200).json({
    data,
  });
};

exports.getPassengePaymentsByIDCardAndCI = async (req, res, next) => {
  //get ci from decoded token
  const ci = getCiFromToken(req.headers["x-access-token"]);
  var idcard = (await Passenger.getPassengerData(ci)).idcard;

  const payments = await Passenger.getPassengePaymentsByIDCardAndCI(idcard, ci);

  return res.status(200).json({
    payments,
  });
};

exports.getPassengeTopUpsByIDCardAndCI = async (req, res, next) => {
  //get ci from decoded token
  const ci = getCiFromToken(req.headers["x-access-token"]);
  var idcard = (await Passenger.getPassengerData(ci)).idcard;

  const topups = await Passenger.getPassengeTopUpsByIDCardAndCI(idcard, ci);

  return res.status(200).json({
    topups,
  });
};

exports.updatePassenger = async (req, res, next) => {
  //get ci from decoded token
  const ci = getCiFromToken(req.headers["x-access-token"]);

  //get the passenger data by ci
  const passengerData = await Passenger.getPassengerDataByCi(ci);

  const update = req.body;

  update.password = bcrypt.hashSync(update.password, 10);

  await Passenger.editPassengerLoginAndPassword(ci, update);

  const passenger = await Passenger.getPassengerDataByCi(ci);

  res.status(200).json({
    passenger,
    message: "Tus datos de Login y Password fueron actualizados exitosamente",
  });
};

exports.editPassengerLoginAndPassword = async (req, res, next) => {
  //get ci from decoded token
  const ci = getCiFromToken(req.headers["x-access-token"]);

  //get the passenger data by ci
  const passengerData = await Passenger.getPassengerDataByCi(ci);

  return res.status(200).json({
    passengerData,
  });
};

function getCiFromToken(token) {
  //get te token header and decode it to query the data in the db
  const decoded = jwt.decode(token, { complete: true });

  //get ci from decoded token and return it
  return decoded.payload.passengerLogin.ci;
}
