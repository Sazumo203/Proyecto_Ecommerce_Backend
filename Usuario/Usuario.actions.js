const Usuario = require("./Usuario.model")
const argon2 = require('argon2');

async function createUsuarioMongo(datos) {
    datos.contrasena = await argon2.hash(datos.contrasena);
    const UsuarioCreado = await Usuario.create(datos);
    return UsuarioCreado;
}

async function readUsuarioMongo(id) {
    const Resultado = await Usuario.findById(id).select('-estado -contrasena');
    return Resultado;
}

async function updateUsuarioMongo(datos) {
    const { id, ...cambios } = datos;
    if(cambios.hasOwnProperty('contrasena')){
        cambios.contrasena = await argon2.hash(cambios.contrasena)
    }
    const UsuarioActualizado = await Usuario.findByIdAndUpdate(id, cambios, { new: true });
    return UsuarioActualizado;
}

async function deleteUsuarioMongo(id) {
    const UsuarioBorrado = await Usuario.findByIdAndUpdate(id, { estado: false });
    return UsuarioBorrado;
}

async function comprobarCredencialesUsuario(credenciales) {
    const { correo, contrasena } = credenciales
    const jwtUsuario = await Usuario.findOne({ correo: correo });
    if (jwtUsuario === null) {
        return null;
    } else {
        if (await argon2.verify(jwtUsuario['contrasena'], contrasena)) {
            return jwtUsuario;
        }else{
            return null;
        }
    }


}

async function comprobarCorreo(correo) {
    const apariciones = await Usuario.countDocuments({ correo: correo });
    return apariciones;
}

async function comprobarExiste(id) {
    const Resultado = await Usuario.findById(id);
    console.log(Resultado);
    if(Resultado!=null){
        return Resultado['estado'];
    }else{
        return false;
    }
}



module.exports = {
    createUsuarioMongo,
    readUsuarioMongo,
    updateUsuarioMongo,
    deleteUsuarioMongo,
    comprobarCredencialesUsuario,
    comprobarCorreo,
    comprobarExiste

};