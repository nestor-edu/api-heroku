const User = require("../models/user");
const serviceResponse = require("../classes/serviceResponse");

const {verifyToken} = require("../utils/jwtTools");

const service = {};

//Creando nuevo usuario con los datos requeridos
service.create = async ({username, email, password, type, confirmPassword}) => {
    try{
        const user = new User({
            username: username,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            type: type
        })

        const userCreated = await user.save();

        if(!userCreated) return new serviceResponse(false);

        return new serviceResponse(true);
    }catch (error) {
        throw error;
    }
};

//Encontrando si hay usernames repetidos
service.findOneByUsername = async(usernameAsigned) => {
    try{
        const user = await User.findOne({username: usernameAsigned});

        if(!user) return new serviceResponse(false);
        
        return new serviceResponse(true, user);
    }catch(error){
        throw error;
    }
};

//Encontrando si hay emails repetidos
service.findOneByEmail = async(emailAsigned) => {
    try{
        const mail = await User.findOne({email: emailAsigned});

        if(!mail) return new serviceResponse(false);
        
        return new serviceResponse(true, mail);
    }catch(error){
        throw error;
    }
};

//Busqueda medieante id
service.findOneById = async(idAsigned) => {
    try{
        const id = await User.findById(idAsigned)

        if(!id) return new serviceResponse(false);
        
        return new serviceResponse(true, id);
    }catch(error){
        throw error;
    }
};

service.matchPassword = async ({password, confirmPassword}) => {
    try{
        if(password === confirmPassword) return new serviceResponse(true);

        return new serviceResponse(false);
    }catch (error) {
        throw error;
    }
};

//Añadiendo tokens validos
service.addValidToken = async (user, token) => {
    try{
        user.validTokens = user.validTokens.filter(token => verifyToken(token));

        const newTokens = [token, ...user.validTokens.slice(0,4)];

        user.validTokens = newTokens;

        const userSaved = await user.save();
        if(!userSaved) return new serviceResponse(false);

        return new serviceResponse(true);
    }catch(error) {
        throw error;
    }
}

//Validando el token
service.validateToken = async (user, token) => {
    try{
        const ind = user.validTokens.findIndex(vToken => vToken === token);

        if(ind < 0) return new serviceResponse(false);

        return new serviceResponse(true);
    }catch(error){
        throw error;
    }
}

module.exports = service;