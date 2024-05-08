const { throwCustomError, validarObjectId } = require("../Utils/functions");
const { createUsuarioMongo, readUsuarioMongo, updateUsuarioMongo, deleteUsuarioMongo } = require("./Usuario.actions");

async function createUsuario(datos) {
    const { nombre, descripcion, correo, contrasena } = datos;


    //const productoSimilar = await getProductoMongo({masa});

    // hacer llamado a base de datos con el filtro de tipo
    const usuarioCreado = await createUsuarioMongo(datos);

    return usuarioCreado;
}

async function readUsuarioPorId(id) {
    if (validarObjectId(id)) {
        const usuarioEncontrado = await readUsuarioMongo(id);
        if (usuarioEncontrado != null) {
            return usuarioEncontrado["_doc"];
        } else {
            throwCustomError(404, "usuario no encontrado");
        }
    } else {
        throwCustomError(404, "id no valida");
    }
}

async function updateUsuario(datos) {

    const { id, nombre, descripcion, correo, contrasena, ...resto } = datos;

    if (id == null) {
        throwCustomError(404, "debe especificar id de usuario a actualizar");
    } else if (validarObjectId(id) === false) {
        throwCustomError(404, "id no valida");
    } else if (await readUsuarioMongo(id) === null) {
        throwCustomError(404, "usuario no existe");
    } else if(false) { 
        // validar que el libro sea del usuario autenticado
    }else {
        const usuarioActualizado = await updateUsuarioMongo(datos);
        return usuarioActualizado;
    }
}

async function deleteUsuarioPorId(id) {

    if (validarObjectId(id)) {
        if (await readUsuarioMongo(id) === null) {
            throwCustomError(404, "usuario no existe");
        } else {
            const usuarioBorrado = await deleteUsuarioMongo(id);
            return usuarioBorrado;
        }
    } else {
        throwCustomError(404, "id no valida");
    }

}


module.exports = {
    createUsuario,
    readUsuarioPorId,
    updateUsuario,
    deleteUsuarioPorId
}