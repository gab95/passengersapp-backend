const registerShape = require("../shapes/register.shape");
const loginShape = require("../shapes/login.shape");

exports.validate = (validation) => {
  return (req, res, next) => {
    try {
      validation(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
};

exports.registerValidation = (registerFormData) => {
  registerShape.registerShape
    .concat(loginShape.loginShape)
    .validateSync(registerFormData);
};

exports.loginValidation = (loginFormData) => {
  loginShape.loginShape.validateSync(loginFormData);
};
