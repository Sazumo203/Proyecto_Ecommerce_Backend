const { throwCustomError } = require("../Utils/functions");
const { createLibroMongo } = require("./Libro.actions");

async function createLibro(datos) {
    const { nombre, autor, genero, editorial, fpublicacion, precio, idvendedor} = datos;

    if (editorial !== "planeta" && editorial !== "editorial B") {
        throwCustomError(501, "editorial invalida");
    }

    //const productoSimilar = await getProductoMongo({masa});

    // hacer llamado a base de datos con el filtro de tipo
    const libroCreado = await createLibroMongo(datos);

    return libroCreado;
}


module.exports = {
    createLibro,
}