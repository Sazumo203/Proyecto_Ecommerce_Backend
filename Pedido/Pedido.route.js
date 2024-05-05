const express = require('express')
const router = express.Router();
const { createPedido } = require("./Pedido.controller.js");
const { respondWithError } = require('../Utils/functions');

async function PostPedido(req, res) {
    try {
        // llamada a controlador con los datos
        await createPedido(req.body);

        res.status(200).json({
            mensaje: "post exitoso"
        })
    } catch(e) {
        respondWithError(res, e);
    }
}

router.post("/",PostPedido);

module.exports = router;