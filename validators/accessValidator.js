const {body} = require("express-validator");

const validator = {};

//Validaciones necesarias para el registro de un nuevo usuario
validator.registerValidator = [
    body("username")
        .notEmpty().withMessage("El nombre de usuario no puede ir vacio")
        .isLength({min: 5, max: 15}).withMessage("El rango para el usuario es de 5 a 15"),
    body("email")
        .notEmpty().withMessage("El email no puede ir vacio")
        .isEmail().withMessage("Email debe ser un correo"),
    body("password")
        .notEmpty().withMessage("El password no debe ir vacio")
        .isLength({min: 8, max: 16}).withMessage("El rango del password es de 8 a 16")
]

//Validaciones para el ingreso de in usuario previamente registrado
validator.loginValidator = [
    body("username")
    .notEmpty().withMessage("El nombre de usuario no debe estar vacio"),
    body("password")
    .notEmpty().withMessage("La contraseña no debe estar vacia")
]

module.exports = validator;