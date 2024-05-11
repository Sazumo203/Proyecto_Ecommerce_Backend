const { throwCustomError } = require("../Utils/functions");
const { comprobarCredencialesUsuario } = require("../Usuario/Usuario.actions");
const {generarJwt} = require("./Autenticacion.actions");


async function iniciarSesion(datos) {
    
    const { correo, contrasena,...resto } = datos;

    if(Object.keys(resto).length > 0){
        throwCustomError(404, "uno o mas campos invalidos");
    }else {
        const usuarioJwt = await comprobarCredencialesUsuario(datos);
        if(usuarioJwt===null){
            throwCustomError(404, "credenciales invalidas");
        }else{
           const jwtGenerado = await generarJwt({id: usuarioJwt['_id']}); 
           return jwtGenerado;
        }
        
    }
    
}

//async function validarAutenticacion(jwtRecibido){
//    const auth = await validarJwt(jwtRecibido);
//    if(auth===false){
//        return false
//    }else{
//        return auth
//    }
//}




module.exports = {
    iniciarSesion
}