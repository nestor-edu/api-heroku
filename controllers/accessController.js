const userService = require("../services/userService");
const {createToken} = require("../utils/jwtTools")

const controller = {};

//Controlador para el registro de usuaios:
controller.register = async (req, res, next) => {
    const {username, email, password, confirmPassword} = req.body;

    const {status: userExists} = await userService.findOneByUsername(username);
    if(userExists) return res.status(409).json({error: "Este usuario ya existe"});

    const {status: emailExists} = await userService.findOneByEmail(email);
    if(emailExists) return res.status(409).json({error: "Este email ya existe"});

    const {status: passwordMatch} = await userService.matchPassword(password, confirmPassword);
    if(!passwordMatch) return res.status(409).json({error: "Las contraseña no coinciden"});

    const {status: userCreated} = await userService.create(req.body);
    if(!userCreated) return res.status(409).json({error: "No se pudo crear el usuario"});

    return res.status(201).json({
        message: "El usuario ha sido registrado exitosamente"
    });
};

//Controlador para el acceso de los usuarios previamente registrados
controller.login = async (req, res, next) => {
    const {username, password} = req.body;

    const {status: userExists, content: user} = await userService.findOneByUsername(username);
    if(!userExists) return res.status(404).json({error: "Este usuario no existe, registrate es gratis!"});

    const correctPassword = user.comparePasswords(password);
    if(!correctPassword) return res.status(401).json({error: "La contraseña ingresada es incorrecta"});

    const token = createToken(user._id);

    const {status: tokenSaved} = await userService.addValidToken(user,token);
    if(!tokenSaved) return res.status(409).json({error: "No se ha podido ingresar, intentalo de nuevo"});

    return res.status(200).json({token: token})
};

module.exports = controller;