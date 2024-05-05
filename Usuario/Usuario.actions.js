const Usuario = require("./Usuario.model")

async function createUsuarioMongo(datos) {
    const UsuarioCreado = await Usuario.create(datos);
    return UsuarioCreado;
}


module.exports = {
    createUsuarioMongo,
};