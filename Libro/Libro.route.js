const express = require('express')
const router = express.Router();
const { createLibro, readLibroPorId, readLibroConFiltros, updateLibro, deleteLibroPorId} = require("./Libro.controller.js");
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

async function GetLibro(req,res) {
    try {
        const results = await readLibroPorId(req.params.id);
        res.status(200).json({
            ...results
        });
    } catch (e) {
        respondWithError(res, e);
    }
}
async function GetLibros(req,res) {
    try {
        const results = await readLibroConFiltros(req.query);
        res.status(200).json({
            ...results
        });
    } catch (e) {
        respondWithError(res, e);
    }
}

async function PatchLibro(req,res) {
    try {
        await updateLibro(req.body);

        res.status(200).json({
            mensaje: "actualización exitosa",
        })
    }catch(e) {
        respondWithError(res, e);
    }
}

async function DeleteLibro(req,res) {
    try {
        await deleteLibroPorId(req.params.id);
        res.status(200).json({
            mensaje: "libro Borrado",
        });
    } catch (e) {
        respondWithError(res, e);
    }
}

router.get("/:id",GetLibro);
router.get("/",GetLibros);
router.post("/",PostLibro);
router.patch("/",PatchLibro);
router.delete("/:id",DeleteLibro);


module.exports = router;