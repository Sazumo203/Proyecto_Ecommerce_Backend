const express = require('express')
const router = express.Router();
const { createUsuario } = require("./Usuario.controller.js");
const { respondWithError } = require('../Utils/functions');

async function PostUsuario(req, res) {
    try {
        // llamada a controlador con los datos
        await createUsuario(req.body);

        res.status(200).json({
            mensaje: "post exitoso"
        })
    } catch(e) {
        respondWithError(res, e);
    }
}

router.post("/",PostUsuario);

module.exports = router;