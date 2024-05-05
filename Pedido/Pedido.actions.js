const Pedido = require("./Pedido.model")

async function createPedidoMongo(datos) {
    const PedidoCreado = await Pedido.create(datos);

    return PedidoCreado;
}


module.exports = {
    createPedidoMongo,
};