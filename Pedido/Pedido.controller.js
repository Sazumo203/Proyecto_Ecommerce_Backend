const { throwCustomError, validarObjectId, esFechaValida } = require("../Utils/functions");
const { createPedidoMongo, readPedidoMongo, readPedidosMongo, updatePedidoMongo, deletePedidoMongo } = require("./Pedido.actions");
const { vendedoresLibros, librosdisponibles, updateLibroMongo } = require("../Libro/Libro.actions");
const { validarJwt } = require('../Autenticacion/Autenticacion.actions');

async function createPedido(datos, auth) {
    const credenciales = await validarJwt(auth);
    if (credenciales === false) {
        throwCustomError(404, "Autenticación invalida");
    } else {
        const { descripcion, libros, valortotal, ...resto } = datos;
        if (Object.keys(resto).length > 0) {
            throwCustomError(404, "uno o mas campos invalidos");
        } else if (!descripcion || !libros || valortotal == null) {
            throwCustomError(400, "campo faltante");
        } else if (!libros.every(validarObjectId)) {
            throwCustomError(400, "Uno o mas id de libros invalidas");
        } else if (!await librosdisponibles(libros)) {
            throwCustomError(404, "Todos los libros deben estar disponibles");
        } else {
            const vendedorLibros = await vendedoresLibros(libros);
            if (vendedorLibros.length > 1) {
                throwCustomError(400, "los libros deben ser de 1 solo proveedor");
            } else {
                const PedidoCreado = await createPedidoMongo({ idVendedor: vendedorLibros[0], idComprador: credenciales['id'], ...datos });
                return PedidoCreado;
            }
        }
    }
}

async function readPedidoPorId(id, auth) {
    const credenciales = await validarJwt(auth);
    if (credenciales === false) {
        throwCustomError(404, "Autenticación invalida");
    } else {
        if (validarObjectId(id)) {
            const pedidoEncontrado = await readPedidoMongo(id);
            if (pedidoEncontrado != null) {
                if (credenciales['id'] === pedidoEncontrado['idVendedor'] || credenciales['id'] === pedidoEncontrado['idComprador']) {
                    return pedidoEncontrado["_doc"];
                } else {
                    throwCustomError(400, "solo puedes ver los pedidos a los que pertenences");
                }

            } else {
                throwCustomError(404, "Pedido no encontrado");
            }
        } else {
            throwCustomError(404, "id no valida");
        }
    }

}

async function readPedidoConFiltros(query, auth) {
    const credenciales = await validarJwt(auth);
    if (credenciales === false) {
        throwCustomError(404, "Autenticación invalida");
    } else {
        const { fechaInicio, fechaFin, estadopedido, all, ...resto } = query
        if (Object.keys(resto).length > 0) {
            throwCustomError(404, "uno o mas filtros invalidos");
        } else if (!esFechaValida(fechaInicio) && fechaInicio != undefined || !esFechaValida(fechaFin) && fechaFin != undefined) {
            throwCustomError(404, "formato de fechas invalido");
        }

        let librosEncontrados;

        if (all != null && Boolean(all) == true) {
            const { all, ...filtro } = query
            librosEncontrados = await readPedidosMongo({ $or: [{ idVendedor: credenciales['id'] }, { idComprador: credenciales['id'] }], ...filtro });
        } else {
            const filtros = { ...query, estado: true, $or: [{ idVendedor: credenciales['id'] }, { idComprador: credenciales['id'] }] }
            librosEncontrados = await readPedidosMongo(filtros);
        }

        if (parseFloat(librosEncontrados["Cantidad"]) > 0) {
            return librosEncontrados;
        } else {
            throwCustomError(404, "sin coincidencias");
        }
    }


}

async function updatePedido(datos, auth) {
    const credenciales = await validarJwt(auth);
    if (credenciales === false) {
        throwCustomError(404, "Autenticación invalida");
    } else {
        const { id, estadopedido, ...resto } = datos;
        if (Object.keys(resto).length > 0) {
            throwCustomError(404, "solo se puede actualizar el estado de un pedido");
        } else if (id == null) {
            throwCustomError(404, "debe especificar id del pedido a actualizar");
        } else if (estadopedido != 'completado' && estadopedido != 'cancelado') {
            throwCustomError(404, "estado no valido");
        } else if (validarObjectId(id) === false) {
            throwCustomError(404, "id de pedido no valida");
        } else {
            const pedidoActualizar = await readPedidoMongo(id);
            if (pedidoActualizar === null) {
                throwCustomError(404, "pedido no existe");
            }
            if (pedidoActualizar['idVendedor'] === credenciales['id'] && (estadopedido === 'completado' || estadopedido === 'cancelado')
                || (pedidoActualizar['idComprador'] === credenciales['id'] && estadopedido === 'cancelado')) {
                if (estadopedido === 'completado') {
                    for (var libro of pedidoActualizar['libros']){
                        await updateLibroMongo({id: libro,estado: false});
                    }
                }
                const pedidoActualizado = await updatePedidoMongo(datos);
                return pedidoActualizado;
            } else {
                throwCustomError(404, "no perteneces a este pedido o intentas una accion invalida");
            }

        }
    }

}

async function deletePedidoPorId(id) {

    if (validarObjectId(id)) {
        let lib = await readPedidoMongo(id);
        if (lib === null) {
            throwCustomError(404, "Pedido no existe");
        } else {

            if (lib['estadopedido'] === 'en progreso') {
                await deletePedidoMongo(id, true);
            } else {
                await deletePedidoMongo(id, false);
            }
        }
    } else {
        throwCustomError(404, "id no valida");
    }

}

module.exports = {
    createPedido,
    readPedidoPorId,
    readPedidoConFiltros,
    updatePedido,
    deletePedidoPorId
}