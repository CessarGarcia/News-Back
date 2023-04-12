const jwt = require("jsonwebtoken");

const getTokenData = (token) => {
    let data = null;
    jwt.verify(token, process.env.SECRETA, (err, decoded) => {
        if(err){
            console.log("Error al obtener data del token");
        }data = decoded;
    });

    return data;
}

module.exports = {getTokenData}