const Pedido = require("./Pedido.model")

async function createPedidoMongo(datos) {
    const PedidoCreado = await Pedido.create(datos);

    return PedidoCreado;
}

async function readPedidoMongo(id){
    const Resultado = await Pedido.findById(id).select('-estado -createdAt -updatedAt');
    return Resultado;
}

async function readPedidosMongo(filtros){
    
    const {fechaInicio, fechaFin, ...rest}= filtros
    let Cantidad;
    let Coincidencias;

    if(){

    }

    
    const fechaInicioDate = new Date(fechaInicio);
    const fechaFinDate = new Date(fechaFin);
    Cantidad = await Pedido.countDocuments({...rest,
        createdAt: { $gte: fechaInicioDate, $lte: fechaFinDate }});
    Coincidencias = await Pedido.find(filtros).select('-estado -createdAt -updatedAt');
    return {
        Cantidad: Cantidad,
        Resultados: Coincidencias
    }
}

async function updatePedidoMongo(datos) {
    const {id , ...cambios} = datos;
    const PedidoActualizado = await Pedido.findByIdAndUpdate(id,cambios,{ new: true });
    return PedidoActualizado;
}

async function deletePedidoMongo(id) {
    const PedidoBorrado = await Pedido.findByIdAndUpdate(id,{ estado: false });
    return PedidoBorrado;
}


module.exports = {
    createPedidoMongo,
    readPedidoMongo,
    readPedidosMongo,
    updatePedidoMongo,
    deletePedidoMongo
};