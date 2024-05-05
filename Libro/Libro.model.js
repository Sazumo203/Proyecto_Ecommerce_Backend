const mongoose = require("mongoose");

const schemaLibro = new mongoose.Schema({
    nombre: {type: String, required: true},
    autor: {type: String, required: true},
    genero: {type: String, required: true},
    editorial: {type: String, required: true},
    fpublicacion: {type: Date, required: true},
    precio: {type: Number, required: true},
    idvendedor: {type: String, required: true},
    estado: {type: Boolean, required: true, default: true}
  }, {
    versionKey: false,
    timestamps: true
});
  
const Model = mongoose.model('Libro', schemaLibro);

module.exports = Model;