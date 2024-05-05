const { throwCustomError } = require("../Utils/functions");
const { createUsuarioMongo } = require("./Usuario.actions");

async function createUsuario(datos) {
    const { nombre, descripcion, correo, contrasena } = datos;

    if (false) {
        throwCustomError(501, "si");
    }

    //const productoSimilar = await getProductoMongo({masa});

    // hacer llamado a base de datos con el filtro de tipo
    const usuarioCreado = await createUsuarioMongo(datos);

    return usuarioCreado;
}


module.exports = {
    createUsuario,
}