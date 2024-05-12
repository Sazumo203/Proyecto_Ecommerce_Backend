const Libro = require("./Libro.model")

async function createLibroMongo(datos) {
    const LibroCreado = await Libro.create(datos);

    return LibroCreado;
}

async function readLibroMongo(id){
    const Resultado = await Libro.findOne({_id: id, estado: true}).select('-estado');
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

async function librosdisponibles(libros){
    const estados = await Libro.distinct('estado',{ _id: { $in: libros } });
    return estados.every(item => item === true);
}

async function librosexisten(libros){
    const encontrados = await Libro.find({ _id: { $in: libros } });
    return encontrados.length;
}

module.exports = {
    createLibroMongo,
    readLibroMongo,
    readLibrosMongo,
    updateLibroMongo,
    deleteLibroMongo,
    vendedoresLibros,
    librosdisponibles,
    librosexisten
};