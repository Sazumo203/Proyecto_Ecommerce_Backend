const express = require('express')
const router = express.Router();
const { createPedido, readPedidoPorId, readPedidoConFiltros, updatePedido, deletePedidoPorId } = require("./Pedido.controller.js");
const { respondWithError, throwCustomError } = require('../Utils/functions');

async function PostPedido(req, res) {
    try {
        
        if(req.headers.authorization===undefined){
            throwCustomError(400, "debe proporcionar autenticación");
        }

        await createPedido(req.body, req.headers.authorization.split(' ')[1]);

        res.status(200).json({
            mensaje: "post exitoso"
        })
    } catch(e) {
        respondWithError(res, e);
    }
}

async function GetPedido(req,res) {
    try {

        if(req.headers.authorization===undefined){
            throwCustomError(400, "debe proporcionar autenticación");
        }

        const result = await readPedidoPorId(req.params.id, req.headers.authorization.split(' ')[1]);

        res.status(200).json({
            ...result
        });
    } catch (e) {
        respondWithError(res, e);
    }
}

async function GetPedidos(req,res) {
    try {
        if(req.headers.authorization===undefined){
            throwCustomError(400, "debe proporcionar autenticación");
        }

        const results = await readPedidoConFiltros(req.query, req.headers.authorization.split(' ')[1]);

        res.status(200).json({
            ...results
        });
    } catch (e) {
        respondWithError(res, e);
    }
}

async function PatchPedido(req,res) {
    try {
        if(req.headers.authorization===undefined){
            throwCustomError(400, "debe proporcionar autenticación");
        }
        
        await updatePedido(req.body, req.headers.authorization.split(' ')[1]);

        res.status(200).json({
            mensaje: "actualización exitosa",
        })
    }catch(e) {
        respondWithError(res, e);
    }
}

async function DeletePedido(req,res) {
    try {
        if(req.headers.authorization===undefined){
            throwCustomError(400, "debe proporcionar autenticación");
        }

        await deletePedidoPorId(req.params.id, req.headers.authorization.split(' ')[1]);

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