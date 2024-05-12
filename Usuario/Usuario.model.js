const mongoose = require("mongoose");

const schemaUsuario = new mongoose.Schema({
    nombre: {type: String, required: true}, // nombre del usuariao
    descripcion: {type: String, required: true}, // descripcion del usuario
    correo: {type: String, required: true}, // correo del usuario
    contrasena: {type: String, required: true}, // contraseña
    estado: {type: Boolean, required: true, default: true}, //estado al igual que en los otros modelos(true: esta en la base de datos, 
  }, {                                                       //false: soft delete)
    versionKey: false,
});
  
const Model = mongoose.model('Usuario', schemaUsuario);

module.exports = Model;