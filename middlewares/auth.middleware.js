const jwt = require("jsonwebtoken");
const Auth = require("../queries/auth.queries");

require("dotenv").config();

//verify token
exports.tokenVerify = (req, res, next) => {
  const accessToken = req.headers["x-access-token"];
  jwt.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        message: "Token incorrecto",
        errors: err,
      });
    }
    req.user = decoded.user;
    next();
  });
};

exports.checkIDCard = async (req, res, next) => {
  const passenger = await Auth.getPassengerWithCard(req.body.idcard);

  if (!passenger) {
    return res.status(500).json({
      ok: false,
      message: "El ID de Tarjeta no existe en la Base de Datos",
    });
  }

  next();
  return;
};

exports.checkDuplicateData = async (req, res, next) => {
  const duplicatePassengerData = await Auth.getPassengerWithData(req.body.ci);

  if (duplicatePassengerData && duplicatePassengerData != undefined) {
    return res.status(500).json({
      ok: false,
      message: "Datos ya registrados, por favor ingrese con sus credenciales",
    });
  }

  next();
  return;
};

exports.checkPassengerDataByIDcard = async (req, res, next) => {
  const passengerDataByIDcard = await Auth.getPassengerDataByIDcard(
    req.body.idcard
  );

  //check if idcard registered in db is equal to data registered in register form
  if (
    passengerDataByIDcard.idcard == req.body.idcard &&
    (passengerDataByIDcard.ci != req.body.ci ||
      passengerDataByIDcard.name != req.body.name ||
      passengerDataByIDcard.lastname != req.body.lastname ||
      passengerDataByIDcard.mlastname != req.body.mlastname)
  ) {
    return res.status(500).json({
      ok: false,
      message: "Datos incorrectos",
    });
  }

  next();
  return;
};

exports.checkDuplicateLogin = async (req, res, next) => {
  const dlogin = await user.duplicateUser(req.body.login);

  if (dlogin === 1) {
    return res.status(500).json({
      ok: false,
      message: "Login ya existente, intente con otro por favor",
    });
  }

  next();
  return;
};
