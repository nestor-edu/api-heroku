const jwt = require("jsonwebtoken");

const secret = process.env.JWTSECRET || "Secret"
const expTime = process.env.JWTEXPTIME || "10d"

const tools = {}

//Creando un nuevo token
tools.createToken = (_id) => {
    const payload = {
        _id
    };

    return jwt.sign(payload, secret, {
        expiresIn: expTime
    });
}

//Verificacion de el token
tools.verifyToken = (token) => {
    try{
        return jwt.verify(token, secret)
    } catch {
        return false;
    }
}

module.exports = tools;