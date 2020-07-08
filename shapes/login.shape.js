const yup = require("yup");

exports.loginShape = yup.object().shape({
  login: yup
    .string()
    .min(1, "Campo login: Mínimo 1 caracteres permitos")
    .required("Campo login: Este campo es obligatorio"),

  password: yup
    .string()
    .min(1, "Campo password: Mínimo 1 caracteres permitos")
    .required("Campo password: Este campo es obligatorio"),
});
