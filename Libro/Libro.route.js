const express = require('express')
const router = express.Router();
const { createLibro, readLibroPorId, readLibroConFiltros, updateLibro, deleteLibroPorId} = require("./Libro.controller.js");
const { respondWithError, throwCustomError } = require('../Utils/functions');



async function PostLibro(req, res) {
    try {
        if(req.headers.authorization===undefined){
            throwCustomError(400, "debe proporcionar autenticación");
        }

        await createLibro(req.body, req.headers.authorization.split(' ')[1]);

        res.status(200).json({
            mensaje: "post exitoso"
        })
    } catch(e) {
        respondWithError(res, e);
    }
}

async function GetLibro(req,res) {
    try {
        const result = await readLibroPorId(req.params.id);
        res.status(200).json({
            ...result
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
        if(req.headers.authorization===undefined){
            throwCustomError(400, "debe proporcionar autenticación");
        }

        await updateLibro(req.body, req.headers.authorization.split(' ')[1]);

        res.status(200).json({
            mensaje: "actualización exitosa",
        })
    }catch(e) {
        respondWithError(res, e);
    }
}

async function DeleteLibro(req,res) {
    try {
        if(req.headers.authorization===undefined){
            throwCustomError(400, "debe proporcionar autenticación");
        }

        await deleteLibroPorId(req.params.id, req.headers.authorization.split(' ')[1]);

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