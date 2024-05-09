const { throwCustomError } = require("../Utils/functions");
const { comprobarCredencialesUsuario, generarJwt } = require("../Usuario/Usuario.actions");



async function iniciarSesion(datos) {
    const { correo, contrasena,...resto } = datos;

    if(Object.keys(resto).length > 0){
        throwCustomError(404, "uno o mas campos invalidos");
    }else {
        const usuarioJwt = await comprobarCredencialesUsuario(datos);
        if(usuarioJwt===null){
            throwCustomError(404, "credenciales invalidas");
        }else{
           const jwtGenerado = await generarJwt(); 
           return jwtGenerado;
        }
        
    }
    
}




module.exports = {
    iniciarSesion
}