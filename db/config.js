const mongoose = require('mongoose');

const conexionDB = async () => {
    try{
        const conex = await mongoose.connect(
            process.env.DB_CONNECTION
        );
        
        conex.STATES.connected
        ?console.log("Conectado a DB")
        :console.log("Error al conectar DB");
    }catch(error){
        console.log("error al conectar");
        process.exit(1); //Detenemos la app
    }
};

module.exports = conexionDB;