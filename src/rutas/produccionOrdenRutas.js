const { Router } = require("express");
const produccionOrdenRutas = Router();
const { produccionOrdenModel, ProduccionOrdenEstados } = require("../modelos/produccionOrdenModel");
const productosModel = require("../modelos/productosModel");

produccionOrdenRutas.get("/", function(req, res) {
    return res.send("Bienvenidos al API Produccion Orden!!!" + ProduccionOrdenEstados.FABRICADO);
});

produccionOrdenRutas.get("/listar", function(req, res) {
    //buscamos todos por ello el parametro es un json vacio
    produccionOrdenModel.find({}, function(error, prodOrdenes){
        productosModel.populate(prodOrdenes, {path: "id_producto"}, function(err, prodOrdenes){
            if (err) {
                return res.status(500).json({estado: "error", msg: "ERROR: poblando los productos en produccion_orden"});
            } else {
                return res.status(200).json({estado: "ok", msg: "Producto Orden encontrada", data: prodOrdenes})
            }
        });
    });
});

exports.produccionOrdenRutas = produccionOrdenRutas;