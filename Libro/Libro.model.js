const mongoose = require("mongoose");

const schemaLibro = new mongoose.Schema({
    tipo: {type: String, required: true},
    relleno: {type: String},
    precio: {type: Number, required: true},
    masa: {type: String, required: true},
    cantidad: {type: Number, required: true},
    coccion: {type: String, required: true}
  }, {
    versionKey: false,
    timestamps: true
});
  
const Model = mongoose.model('Libro', schemaLibro);

module.exports = Model;