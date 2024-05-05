const { throwCustomError } = require("../Utils/functions");
const { createPedidoMongo } = require("./Pedido.actions");

async function createPedido(datos) {
    const { idVendedor, idComprador,descripcion, libros, valortotal} = datos;

    if (valortotal<30000) {
        throwCustomError(501, "Coccion invalida.");
    }

    //const productoSimilar = await getProductoMongo({masa});

    // hacer llamado a base de datos con el filtro de tipo
    const PedidoCreado = await createPedidoMongo(datos);

    return PedidoCreado;
}


module.exports = {
    createPedido,
}