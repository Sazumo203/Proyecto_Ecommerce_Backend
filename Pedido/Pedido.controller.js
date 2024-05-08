const { throwCustomError, validarObjectId } = require("../Utils/functions");
const { createPedidoMongo, readPedidoMongo, readPedidosMongo, updatePedidoMongo, deletePedidoMongo } = require("./Pedido.actions");

async function createPedido(datos) {
    const { idVendedor, idComprador, descripcion, libros, valortotal } = datos;

    //validaciones

    const PedidoCreado = await createPedidoMongo(datos);

    return PedidoCreado;
}

async function readPedidoPorId(id) {
    if (validarObjectId(id)) {
        const pedidoEncontrado = await readPedidoMongo(id);
        if (pedidoEncontrado != null) {
            return pedidoEncontrado["_doc"];
        } else if (false) {
            //validar que o el vendedor o el comprador coincidan con el id auth
        } else {
            throwCustomError(404, "Pedido no encontrado");
        }
    } else {
        throwCustomError(404, "id no valida");
    }
}

async function readPedidoConFiltros(query) {
    const { fechaInicio, fechaFin, estadopedido, all, ...resto } = query
    if (Object.keys(resto).length > 0) {
        throwCustomError(404, "uno o mas filtros invalidos");
    }
    let librosEncontrados;
    //VERIFICAR QUE LOS LIBROS LEIDOS SOLO SEAN DE LA AUTENTICACION
    if (all != null && all == true) {
        const { all, ...filtro } = query
        librosEncontrados = await readPedidosMongo(filtro);
    } else {
        const filtros = { ...query, estado: true }
        librosEncontrados = await readPedidosMongo(filtros);
    }

    if (parseFloat(librosEncontrados["Cantidad"]) > 0) {
        return librosEncontrados;
    } else {
        throwCustomError(404, "sin coincidencias");
    }

}

async function updatePedido(datos) {

    const { id, estadopedido, ...resto } = datos;
    if (Object.keys(resto).length > 0) {
        throwCustomError(404, "solo se puede actualizar el estado de un pedido");
    } else if (id == null) {
        throwCustomError(404, "debe especificar id del pedido a actualizar");
    } else if (estadopedido != 'completado' && estadopedido != 'cancelado') {
        throwCustomError(404, "estado no valido");
    } else if (validarObjectId(id) === false) {
        throwCustomError(404, "id de pedido no valida");
    } else if (await readLibroMongo(id) === null) {
        throwCustomError(404, "pedido no existe");
    } else if (false) {
        // validar que el usuario autenticado pertenezca al pedido y
        // verificar si el que realizo solo cancele y el que recibio 
        // solo complete o cancele
    } else {
        const pedidoActualizado = await updatePedidoMongo(datos);
        return pedidoActualizado;
    }
}

async function deletePedidoPorId(id) {

    if (validarObjectId(id)) {
        if (await readPedidoMongo(id) === null) {
            throwCustomError(404, "Pedido no existe");
        } else {
            const libroBorrado = await deletePedidoMongo(id);
            return libroBorrado;
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