const debug = require("debug")("app:mongoose");
const mongoose = require("mongoose");

const dbhost = process.env.DBHOST || "localhost";
const dbport = process.env.DBPORT || "27017";
const dbname = process.env.DBNAME || "AppEllasDB";

const dburi = process.env.DBURI || `mongodb://${dbhost}:${dbport}/${dbname}`;

//Configurando a la base de datos de mongodb
const connect = async () => {
    try{
        await mongoose.connect(dburi, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }); 
        debug("Conexion realizada")
    }catch(error) {
        console.log(error);
        debug("No se pudo conectar")
        process.exit(1)
    }
}

module.exports = {
    connect
}