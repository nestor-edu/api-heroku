const {verifyToken} = require("../utils/jwtTools");
const mongoose = require("mongoose");
const userService = require("../services/userService");

const middleware = {};

const tokenPrefix = process.env.TOKENPREFIX || "Bearer"

//Creando middleware para requerir la autorizacion usando tokens
middleware.authRequired = async (req, res, next) => {
    const {authorization} = req.headers;

    if(!authorization) {
        return res.status(400).json({error: "Se necesita autorizacion para acceder"});
    }

    const [prefix, token] = authorization.split(" ");

    if(prefix !== tokenPrefix){
        return res.status(400).json({error: "El prefijo es incorrecto"});
    }

    const tokenPayload = verifyToken(token);
    if(!tokenPayload){
        return res.status(403).json({error: "Accseso denegado"});
    }

    const {_id: userID} = tokenPayload;
    if(!mongoose.Types.ObjectId.isValid(userID)){
        return res.status(403).json({error: "Acceso denegado"});
    }

    const {status: userExists, content: user} = await userService.findOneById(userID);
    if(!userExists){
        return res.status(404).json({error: "El usuario ingresado no existe"});
    }

    const {status: tokenIsValid} = await userService.validateToken(user, token);
    if(!tokenIsValid){
        return res.status(403).json({error:"Acceso denegado"});
    }

    req.user = user;
    next();
}

module.exports = middleware;