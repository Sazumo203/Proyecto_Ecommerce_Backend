const Libro = require("./Libro.model")

async function createLibroMongo(datos) {
    const LibroCreado = await Libro.create(datos);

    return LibroCreado;
}

async function readLibroMongo(id){
    const Resultado = await Libro.findById(id).select('-estado');
    return Resultado;
}
async function readLibrosMongo(filtros){
    const Cantidad = await Libro.countDocuments(filtros);
    const Coincidencias = await Libro.find(filtros).select('_id nombre autor precio');
    return {
        Cantidad: Cantidad,
        Resultados: Coincidencias
    }
}
async function updateLibroMongo(datos) {
    const {id , ...cambios} = datos;
    const LibroActualizado = await Libro.findByIdAndUpdate(id,cambios,{ new: true });
    return LibroActualizado;
}
async function deleteLibroMongo(id) {
    const LibroBorrado = await Libro.findByIdAndUpdate(id,{ estado: false });
    return LibroBorrado;
}

async function vendedoresLibros(libros){
    const vendedores = await Libro.distinct('idvendedor',{ _id: { $in: libros } });
    return vendedores;
} 

module.exports = {
    createLibroMongo,
    readLibroMongo,
    readLibrosMongo,
    updateLibroMongo,
    deleteLibroMongo,
    vendedoresLibros
};