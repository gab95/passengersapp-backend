const yup = require("yup");

exports.registerShape = yup.object().shape({
  idcard: yup
    .string()
    .min(10, "Campo ID Tarjeta: Mínimo 10 números permitidos")
    .max(15, "Campo ID Tarjeta: Máximo 15 números permitidos")
    .matches(/^[1-9][0-9]*$/, {
      message: "Campo ID Tarjeta: Solo puede introducir números en este campo",
      excludeEmptyString: true,
    })
    .required("Campo ID Tarjeta: Este campo es obligatorio"),

  ci: yup
    .string()
    .min(1, "Campo CI: Mínimo 1 caracteres permitidos")
    .max(8, "Campo CI: Máximo 8 caracteres permitidos")
    .matches(/^[1-9][0-9]*$/, {
      message: "Campo CI: Solo puede introducir números en este campo",
      excludeEmptyString: true,
    })
    .required("Campo CI: Este campo es obligatorio"),

  name: yup
    .string()
    .matches(/^[a-zA-Z_áéíóúÁÉÍÓÚñÑ\s]*$/, {
      message: "Campo nombre: Solo puede introducir letras en este campo",
      excludeEmptyString: true,
    })
    .min(2, "Campo nombre: Mínimo 2 caracteres permitos")
    .max(25, "Campo nombre: Máximo 25 caracteres permitidos")
    .required("Campo nombre: Este campo es obligatorio"),

  lastname: yup
    .string()
    .matches(/^[a-zA-Z_áéíóúÁÉÍÓÚñÑ\s]*$/, {
      message:
        "Campo apellido paterno: Solo puede introducir letras en este campo",
      excludeEmptyString: true,
    })
    .min(2, "Campo apellido paterno: Mínimo 2 caracteres permitos")
    .max(25, "Campo apellido paterno: Máximo 25 caracteres permitidos")
    .required("Campo apellido paterno: Este campo es obligatorio"),

  mlastname: yup
    .string()
    .matches(/^[a-zA-Z_áéíóúÁÉÍÓÚñÑ\s]*$/, {
      message:
        "Campo apellido materno: Solo puede introducir letras en este campo",
      excludeEmptyString: true,
    })
    .min(2, "Campo apellido materno: Mínimo 2 caracteres permitos")
    .max(25, "Campo apellido materno: Máximo 25 caracteres permitidos")
    .required("Campo apellido materno: Este campo es obligatorio"),
});
