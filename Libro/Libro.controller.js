const { throwCustomError } = require("../Utils/functions");
const { createLibroMongo } = require("./Libro.actions");

async function createLibro(datos) {
    const { tipo, relleno, precio, masa, cantidad, coccion } = datos;

    if (coccion !== "Frito" && coccion !== "Horneado") {
        throwCustomError(501, "Coccion invalida.");
    }

    //const productoSimilar = await getProductoMongo({masa});

    // hacer llamado a base de datos con el filtro de tipo
    const libroCreado = await createLibroMongo(datos);

    return libroCreado;
}


module.exports = {
    createLibro,
}