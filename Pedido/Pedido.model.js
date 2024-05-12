const mongoose = require("mongoose");

const schemaUsuario = new mongoose.Schema({
    idVendedor: {type: String, required: true}, // id del vendedor asociado al pedido
    idComprador: {type: String, required: true}, // id del comprador asociado al pedido
    descripcion: {type: String,required: true}, // descripcion del pedido
    libros: {type: [String],required: true}, // Libros a comprar dentro del pedido
    valortotal: {type: Number,required: true}, // valor total del pedido
    estadopedido: {type: String, required: true, enum:['en progreso','completado','cancelado'],default:'en progreso'}, //estado en el que se encuentra el pedido
    estado: {type: Boolean, required: true, default: true} //// estado representa si el pedido ha sufrido soft delete o no (true es que aun existe 
  }, {                                                          // y false que) fue borrado
    versionKey: false,
    timestamps: true
});
  
const Model = mongoose.model('Pedido', schemaUsuario);

module.exports = Model;