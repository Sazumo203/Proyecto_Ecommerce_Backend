const express = require('express')
const router = express.Router();
const { createPedido, readPedidoPorId, readPedidoConFiltros, updatePedido, deletePedidoPorId } = require("./Pedido.controller.js");
const { respondWithError } = require('../Utils/functions');

async function PostPedido(req, res) {
    try {

        await createPedido(req.body);

        res.status(200).json({
            mensaje: "post exitoso"
        })
    } catch(e) {
        respondWithError(res, e);
    }
}

async function GetPedido(req,res) {
    try {
        const result = await readPedidoPorId(req.params.id);
        res.status(200).json({
            ...result
        });
    } catch (e) {
        respondWithError(res, e);
    }
}

async function GetPedidos(req,res) {
    try {
        const results = await readPedidoConFiltros(req.query);
        res.status(200).json({
            ...results
        });
    } catch (e) {
        respondWithError(res, e);
    }
}

async function PatchPedido(req,res) {
    try {
        await updatePedido(req.body);

        res.status(200).json({
            mensaje: "actualización exitosa",
        })
    }catch(e) {
        respondWithError(res, e);
    }
}

async function DeletePedido(req,res) {
    try {
        await deletePedidoPorId(req.params.id);
        res.status(200).json({
            mensaje: "libro Borrado",
        });
    } catch (e) {
        respondWithError(res, e);
    }
}

router.get("/:id",GetPedido);
router.get("/",GetPedidos);
router.post("/",PostPedido);
router.patch("/",PatchPedido);
router.delete("/:id",DeletePedido);

module.exports = router;