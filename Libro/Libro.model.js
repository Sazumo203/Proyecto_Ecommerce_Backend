const mongoose = require("mongoose");

const schemaLibro = new mongoose.Schema({
    nombre: {type: String, required: true}, //nombre del libro
    autor: {type: String, required: true},  // autor del libro
    genero: {type: String, required: true}, // genero del libro
    editorial: {type: String, required: true}, // editorial del libro
    fpublicacion: {type: Date, required: true}, // fecha de publicación del libro
    precio: {type: Number, required: true}, // precio del libro
    idvendedor: {type: String, required: true}, // id del vendedor del libro
    estado: {type: Boolean, required: true, default: true} // estado representa si el libro ha sufrido soft delete o no (true es que aun existe 
  }, {                                                      // y false que fue borrado)
    versionKey: false,
    timestamps: true
});
  
const Model = mongoose.model('Libro', schemaLibro);

module.exports = Model;