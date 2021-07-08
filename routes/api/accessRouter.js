const router = require("express").Router();

//Declarando accesos para los controladores, las validaciones y middleware
const accessController = require("../../controllers/accessController")
const {registerValidator, loginValidator} = require("../../validators/accessValidator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

//Dando acceso al router para usar login y register, juntos a los validadores y accesos
router.post("/register", registerValidator, validatorMiddleware, accessController.register);
router.post("/login", loginValidator, validatorMiddleware, accessController.login)

module.exports = router;