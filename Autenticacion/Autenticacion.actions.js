const JWT = require('jsonwebtoken');
require('dotenv').config();
const { comprobarExiste } =  require("../Usuario/Usuario.actions");
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
    if(validacion!==false){
        if(await comprobarExiste(validacion.id)){
            return validacion;
        }else{
            return false;
        }
    }else{
        return false;
    }
    
    
}

module.exports = {
    generarJwt,
    validarJwt
}


