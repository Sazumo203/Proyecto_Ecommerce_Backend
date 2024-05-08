const Usuario = require("./Usuario.model")

async function createUsuarioMongo(datos) {
    const UsuarioCreado = await Usuario.create(datos);
    return UsuarioCreado;
}

async function readUsuarioMongo(id){
    const Resultado = await Usuario.findById(id).select('-estado');
    return Resultado;
}

async function updateUsuarioMongo(datos) {
    const {id , ...cambios} = datos;
    const UsuarioActualizado = await Usuario.findByIdAndUpdate(id,cambios,{ new: true });
    return UsuarioActualizado;
}

async function deleteUsuarioMongo(id) {
    const UsuarioBorrado = await Usuario.findByIdAndUpdate(id,{ estado: false });
    return UsuarioBorrado;
}

module.exports = {
    createUsuarioMongo,
    readUsuarioMongo,
    updateUsuarioMongo,
    deleteUsuarioMongo
};