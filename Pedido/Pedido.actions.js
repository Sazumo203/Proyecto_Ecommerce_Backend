const Pedido = require("./Pedido.model")

async function createPedidoMongo(datos) {
    const PedidoCreado = await Pedido.create(datos);

    return PedidoCreado;
}

async function readPedidoMongo(id) {
    const Resultado = await Pedido.findOne({_id: id, estado: true}).select('-estado -createdAt -updatedAt');
    return Resultado;
}

async function readPedidosMongo(filtros) {

    const { fechaInicio, fechaFin, ...rest } = filtros
    let Cantidad;
    let Coincidencias;

    if (fechaInicio == null || fechaFin == null) {
        Cantidad = await Pedido.countDocuments(rest);
        Coincidencias = await Pedido.find(rest).select('_id idVendedor idComprador estadopedido estado createdAt');
    } else {
        const fechaInicioDate = new Date(fechaInicio);
        const fechaFinDate = new Date(fechaFin);
        fechaFinDate.setDate(fechaFinDate.getDate() + 1);
        Cantidad = await Pedido.countDocuments({
            ...rest,
            createdAt: { $gte: fechaInicioDate, $lte: fechaFinDate }
        });
        Coincidencias = await Pedido.find({
            ...rest,
            createdAt: { $gte: fechaInicioDate, $lte: fechaFinDate }
        }).select('_id idVendedor idComprador estadopedido estado createdAt');
    }

    return {
        Cantidad: Cantidad,
        Resultados: Coincidencias
    }
}

async function updatePedidoMongo(datos) {
    const { id, ...cambios } = datos;
    const PedidoActualizado = await Pedido.findByIdAndUpdate(id, cambios, { new: true });
    return PedidoActualizado;
}

async function deletePedidoMongo(id, est) {
    if (est) {
        await Pedido.findByIdAndUpdate(id, { estado: false, estadopedido: 'cancelado' });
    } else {
        await Pedido.findByIdAndUpdate(id, { estado: false });
    }

}


module.exports = {
    createPedidoMongo,
    readPedidoMongo,
    readPedidosMongo,
    updatePedidoMongo,
    deletePedidoMongo
};