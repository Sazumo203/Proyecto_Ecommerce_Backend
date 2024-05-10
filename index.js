const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.get("/", (req,res) => {
    res.status(200).json({});
})

const rutasLibro = require('./Libro/Libro.route.js');
app.use('/libro', rutasLibro);

const rutasPedido = require('./Pedido/Pedido.route.js');
app.use('/pedido', rutasPedido);

const rutasUsuario = require('./Usuario/Usuario.route.js');
app.use('/usuario', rutasUsuario);

const rutasAutenticacion = require('./Autenticacion/Autenticacion.route.js');
app.use('/auth', rutasAutenticacion);

mongoose.connect(`mongodb+srv://${process.env.USUARIO}:${process.env.CONTRASENA}@clusterlibros.xisqks6.mongodb.net/`);
app.listen(8080);
