const { throwCustomError, validarObjectId, esFechaValida } = require("../Utils/functions");
const { createLibroMongo, readLibroMongo, readLibrosMongo, updateLibroMongo, deleteLibroMongo } = require("./Libro.actions");
const { validarJwt } = require('../Autenticacion/Autenticacion.actions');

async function createLibro(datos, auth) {
    const credenciales = await validarJwt(auth);
    if (credenciales === false) {
        throwCustomError(404, "Autenticación invalida");
    } else {
        const { nombre, autor, genero, editorial, fpublicacion, precio, ...resto } = datos;
        const fechaDeHoy = new Date();
        const ffpublicacion = new Date(fpublicacion);
        if (Object.keys(resto).length > 0) {
            throwCustomError(404, "uno o mas campos invalidos");
        } else if (!nombre || !autor || !genero || !editorial || !fpublicacion || precio == undefined) {
            throwCustomError(400, "campo faltante");
        } else if (precio <= 0) {
            throwCustomError(400, "precio no valido");
        } else if (ffpublicacion > fechaDeHoy || !esFechaValida(fpublicacion)) {
            throwCustomError(400, "fecha no valida");
        }

        const libroCreado = await createLibroMongo({ idvendedor: credenciales['id'], ...datos });
        return libroCreado;

    }

}

async function readLibroPorId(id) {
    if (validarObjectId(id)) {
        const libroEncontrado = await readLibroMongo(id);
        if (libroEncontrado != null) {
            return libroEncontrado["_doc"];
        } else {
            throwCustomError(404, "libro no encontrado");
        }
    } else {
        throwCustomError(404, "id no valida");
    }
}

async function readLibroConFiltros(query) {
    const { nombre, autor, editorialm, fpublicacion, genero, all, ...resto } = query
    if (Object.keys(resto).length > 0) {
        throwCustomError(404, "uno o mas filtros invalidos");
    }

    let librosEncontrados;

    if (all != null && Boolean(all) === true) {
        const { all, ...filtro } = query
        librosEncontrados = await readLibrosMongo(filtro);
    } else {
        const filtros = { ...query, estado: true }
        librosEncontrados = await readLibrosMongo(filtros);
    }

    if (parseFloat(librosEncontrados["Cantidad"]) > 0) {
        return librosEncontrados;
    } else {
        throwCustomError(404, "sin coincidencias");
    }

}

async function updateLibro(datos, auth) {
    const credenciales = await validarJwt(auth);
    if (credenciales === false) {
        throwCustomError(404, "Autenticación invalida");
    } else {
        const { id, nombre, autor, genero, editorial, precio, ...resto } = datos;

        if (Object.keys(resto).length > 0) {
            throwCustomError(404, "uno o mas campos a actualizar invalidos");
        } else if (id == null) {
            throwCustomError(404, "debe especificar id de libro a actualizar");
        } else if (validarObjectId(id) === false) {
            throwCustomError(404, "id no valida");
        } else {
            const libroUpdate = await readLibroMongo(id);
            if (libroUpdate === null) {
                throwCustomError(404, "libro no existe");
            } else if (libroUpdate['idvendedor']!==credenciales['id']) {
                throwCustomError(404, "Solo puedes modificar libro si eres el propietario");
            } else {
                const libroActualizado = await updateLibroMongo(datos);
                return libroActualizado;
            }
        }
    }


}

async function deleteLibroPorId(id, auth) {
    const credenciales = await validarJwt(auth);
    if (credenciales === false) {
        throwCustomError(404, "Autenticación invalida");
    } else {
        if (validarObjectId(id)) {
            const libroDelete = await readLibroMongo(id);
            if (libroDelete === null) {
                throwCustomError(404, "libro no existe");
            }else if(libroDelete['idvendedor']!==credenciales['id']){
                throwCustomError(404, "Solo puedes eliminar un libro si eres el propietario");
            } else {
                const libroBorrado = await deleteLibroMongo(id);
                return libroBorrado;
            }
        } else {
            throwCustomError(404, "id no valida");
        }
    }
    
}

module.exports = {
    createLibro,
    readLibroPorId,
    readLibroConFiltros,
    updateLibro,
    deleteLibroPorId
}