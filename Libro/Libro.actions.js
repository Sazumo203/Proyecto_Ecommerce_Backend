const Libro = require("./Libro.model")

async function createLibroMongo(datos) {
    const LibroCreado = await Libro.create(datos);

    return LibroCreado;
}


module.exports = {
    createLibroMongo,
};