const express = require('express')
const router = express.Router();
const { createLibro } = require("./Libro.controller.js");
const { respondWithError } = require('../Utils/functions');

async function PostLibro(req, res) {
    try {
        // llamada a controlador con los datos
        await createLibro(req.body);

        res.status(200).json({
            mensaje: "post exitoso"
        })
    } catch(e) {
        respondWithError(res, e);
    }
}

router.post("/",PostLibro);

module.exports = router;