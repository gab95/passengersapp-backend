const Auth = require("../queries/auth.queries");
const Passenger = require("../queries/passenger.queries");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

exports.registerPassenger = async (req, res, next) => {
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  await Auth.registerPassenger(req.body);
  return res.json({ message: "Pasajero creado exitosamente" });
};

exports.loginPassenger = async (req, res, next) => {
  const { login, password } = req.body;

  const passengerLogin = await Auth.loginPassenger(login);

  if (!passengerLogin || passengerLogin.length < 1) {
    return res.status(404).json({
      success: "false",
      message: "El pasajero no está registrado en la base de datos",
    });
  }

  const validPassword = bcrypt.compareSync(password, passengerLogin.password);

  if (!validPassword) {
    return res.status(404).json({
      success: "false",
      message: "Login o Password incorrectos",
    });
  }

  passengerLogin.password = ":)";
  const accessToken = jwt.sign(
    { passengerLogin: passengerLogin },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  return res.status(200).json({
    accessToken,
  });
};
