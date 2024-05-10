const JWT = require('jsonwebtoken');
require('dotenv').config();
const claveSecreta = process.env.CLAVESECRETA;

async function generarJwt(credenciales){
    const jwt = JWT.sign(credenciales,claveSecreta);
    return jwt;
}

async function validarJwt(jwt){
    const validacion = JWT.verify(jwt, claveSecreta, (error, decoded) => {
        if (error) {
            return false
        } else {
            return decoded
        }
    });
    return validacion;
}

module.exports = {
    generarJwt,
    validarJwt
}


