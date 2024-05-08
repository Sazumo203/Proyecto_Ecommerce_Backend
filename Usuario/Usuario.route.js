const express = require('express')
const router = express.Router();
const { createUsuario, readUsuarioPorId, updateUsuario, deleteUsuarioPorId } = require("./Usuario.controller.js");
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

async function GetUsuario(req,res) {
    try {
        const result = await readUsuarioPorId(req.params.id);
        res.status(200).json({
            ...result
        });
    } catch (e) {
        respondWithError(res, e);
    }
}

async function PatchUsuario(req,res) {
    try {
        await updateUsuario(req.body);

        res.status(200).json({
            mensaje: "actualización exitosa",
        })
    }catch(e) {
        respondWithError(res, e);
    }
}

async function DeleteUsuario(req,res) {
    try {
        await deleteUsuarioPorId(req.params.id);
        res.status(200).json({
            mensaje: "usuario Borrado",
        });
    } catch (e) {
        respondWithError(res, e);
    }
}

router.get("/:id",GetUsuario);
router.post("/",PostUsuario);
router.patch("/",PatchUsuario);
router.delete("/:id",DeleteUsuario);




module.exports = router;