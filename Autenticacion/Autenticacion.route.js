const express = require('express')
const router = express.Router();
const { respondWithError } = require('../Utils/functions');
const { iniciarSesion } = require("./Autenticacion.controller.js");

async function PostAutenticacion(req, res) {
    try {
        // llamada a controlador con los datos
        const jwtUsuario = await iniciarSesion(req.body);

        res.status(200).json({
            mensaje: "sesión iniciada",
            jwt: jwtUsuario
        })
    } catch(e) {
        respondWithError(res, e);
    }
}

router.post("/",PostAutenticacion);
module.exports = router;