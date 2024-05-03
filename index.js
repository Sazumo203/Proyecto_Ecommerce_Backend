const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req,res) => {
    res.status(200).json({});
})

const rutasLibro = require('.\\Libro\\Libro.route.js');
app.use('/libro', rutasLibro);

//const rutasPedido = require('.\\Pedido\\Pedido.route.js');
//app.use('/pedido', rutasPedido);
//
//const rutasUsuario = require('.\\Usuario\\Usuario.route.js');
//app.use('/usuario', rutasUsuario);


mongoose.connect('mongodb+srv://sazumo:I3UzGaUHfGMda7Kh@clusterlibros.xisqks6.mongodb.net/');
app.listen(8080);
