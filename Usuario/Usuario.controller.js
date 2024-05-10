const { throwCustomError, validarObjectId } = require("../Utils/functions");
const { createUsuarioMongo, readUsuarioMongo, updateUsuarioMongo, deleteUsuarioMongo, comprobarCorreo } = require("./Usuario.actions");
const { validarJwt } = require('../Autenticacion/Autenticacion.actions');

async function createUsuario(datos) {
    const { nombre, descripcion, correo, contrasena, ...resto } = datos;

    
    if (Object.keys(resto).length > 0) {
        throwCustomError(404, "uno o mas campos invalidos");
    } else if (!nombre || !descripcion || !correo || !contrasena) {
        throwCustomError(400, "campo faltante");
    } else if (await comprobarCorreo(correo) > 0) {
        throwCustomError(400, "este correo ya tiene una cuenta asociada");
    } else {
        const usuarioCreado = await createUsuarioMongo(datos);
        return usuarioCreado;
    }


}

async function readUsuarioPorId(id, auth) {
    const credenciales = await validarJwt(auth);
    if (credenciales === false) {
        throwCustomError(404, "Autenticación invalida");
    } else {
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
}

async function updateUsuario(datos, auth) {
    const credenciales = await validarJwt(auth);
    if (credenciales === false) {
        throwCustomError(404, "Autenticación invalida");
    } else {
        const { id, nombre, descripcion, correo, contrasena, ...resto } = datos;
        if (Object.keys(resto).length > 0) {
            throwCustomError(404, "uno o mas campos a actualizar invalidos");
        } else if (id == null) {
            throwCustomError(404, "debe especificar id de usuario a actualizar");
        } else if (validarObjectId(id) === false) {
            throwCustomError(404, "id no valida");
        } else {
            const usuarioUpdate = await readUsuarioMongo(id);
            if (usuarioUpdate === null) {
                throwCustomError(404, "usuario no existe");
            } else if (usuarioUpdate['_id'].toString() !== credenciales['id']) {
                throwCustomError(404, "Solo puedes modificar el perfil propio");
            } else {
                const usuarioActualizado = await updateUsuarioMongo(datos);
                return usuarioActualizado;
            }
        }
    }
}

async function deleteUsuarioPorId(id, auth) {
    const credenciales = await validarJwt(auth);
    if (credenciales === false) {
        throwCustomError(404, "Autenticación invalida");
    } else {
        if (validarObjectId(id)) {
            const usuarioDelete = await readUsuarioMongo(id);
            if (usuarioDelete === null) {
                throwCustomError(404, "usuario no existe");
            } else if (usuarioDelete['_id'].toString() !== credenciales['id']) {
                throwCustomError(404, "Solo puedes eliminar el perfil propio");
            } else {
                const usuarioBorrado = await deleteUsuarioMongo(id);
                return usuarioBorrado;
            }
        } else {
            throwCustomError(404, "id no valida");
        }
    }


}


module.exports = {
    createUsuario,
    readUsuarioPorId,
    updateUsuario,
    deleteUsuarioPorId
}