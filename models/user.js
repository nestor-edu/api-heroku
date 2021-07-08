const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const crypto = require("crypto");

//Creando un esquema para el usuario y sus datos solicitados
const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    hashedPassword: {
        type: String,
        require: true
    },
    type: {
        type: Boolean,
        require: true
    },
    salt: String,
    validTokens: [String]
},{
    timestamps: true
}); 

//Creacion de una sal y encriptamiento de la contraseña
userSchema.methods = {
    makeSalt: function() {
        return Math.random + "";
    },
    encryptPassword: function (password) {
        if(!password) return "";

        try{
            const encryptedPassword = crypto
                .createHash("sha256", this.salt)
                .update(password)
                .digest("hex")

            return encryptedPassword;
        }catch{
            return "";
        }
    },
    comparePasswords: function (input) {
        return this.encryptPassword(input) === this.hashedPassword;
    }
};

//Asignando el encryptamiento a la contraseña ingresada por el usuario
userSchema.virtual("password").set(function (password) {
    if(password === "") return

    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
})

module.exports = mongoose.model("user", userSchema); 