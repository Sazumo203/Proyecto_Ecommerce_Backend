const mongoose = require("mongoose");

const schemaUsuario = new mongoose.Schema({
    nombre: {type: String, required: true},
    descripcion: {type: String, required: true},
    correo: {type: String, required: true},
    contrasena: {type: String, required: true},
    estado: {type: Boolean, required: true, default: true},

  }, {
    versionKey: false,
});
  
const Model = mongoose.model('Usuario', schemaUsuario);

module.exports = Model;