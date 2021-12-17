const { Router } = require("express");
const produccionOrdenRutas = Router();
const { produccionOrdenModel, ProduccionOrdenEstados } = require("../modelos/produccionOrdenModel");
const { produccionStockModel } = require("../modelos/produccionStockModel");
const productosModel = require("../modelos/productosModel");

produccionOrdenRutas.get("/", function(req, res) {
    return res.send("Bienvenidos al API Produccion Orden!!!");
});

/**
 * API Rest Listar ProductoOrden
 * Descripcion: Obtiene todos producto orden
 * Ruta: /listar
 * Metodo: GET
 * Datos de entrada:
 * Respuesta: { "estado": "ok", "msg": "Producto Orden encontrado", "data": [ { "_id": "61bbbeae9953cce7e56890a6", "id_producto": { "_id": "61bbbeae9953cce7e56890a4", "nombre": "varilla 1/2", "unidad_medida": "unidad", "valor": 32000 }, "estado": "NO_INICIADO" } ] }
 */
produccionOrdenRutas.get("/listar", function(req, res) {
    //buscamos todos por ello el parametro es un json vacio
    produccionOrdenModel.find({}, function(error, prodOrdenes){
        productosModel.populate(prodOrdenes, {path: "id_producto"}, function(err, prodOrdenes){
            if (err) {
                return res.status(500).json({estado: "error", msg: "ERROR: poblando los productos en produccion_orden"});
            } else {
                return res.status(200).json({estado: "ok", msg: "Producto Orden encontrado", data: prodOrdenes})
            }
        });
    });
});

/**
 * API Rest Iniciar ProductoOrden
 * Descripcion: Cambia de estado de la produccion_orden a INICIADO. Solo es posible hacerlo si el estado actual es diferente de INICIADO
 * Ruta: /iniciar
 * Metodo: POST
 * Datos de entrada: { "cantidad_producir": 10, "id_producto": "61bbbeae9953cce7e56890a6" }
 * Respuesta: { "estado": "ok", "msg": "Producto Orden cambiado de estado a INICIADO" }
 */
produccionOrdenRutas.post("/iniciar", function(req, res) {
    //desestructuracion
    const data = req.body;
    const cantidad_producir = data.cantidad_producir;
    const id_producto = data.id_producto;

    //Validamos que la cantidad a producir exista y sea mayor a cero
    if (cantidad_producir && cantidad_producir > 0) {
        //validamos que en la peticion se envie un id_producto para poder consultar el registro
        if (id_producto) {
            //Buscamos si existe un produccion_orden para el id producto recibido
            produccionOrdenModel.findOne({id_producto: id_producto}, function(error, infoProduccionOrden) {
                if (error) {
                    return res.status(500).json({estado: "error", msg: "No se encontro ninguna produccion_orden con el id recibido"});            
                } else {
                    //solo se permitira iniciar produccion si no esta iniciada
                    if (infoProduccionOrden.estado !== ProduccionOrdenEstados.INICIADO) {
                        produccionOrdenModel.updateOne({_id: infoProduccionOrden._id}, {$set:{cantidad_producir, estado: ProduccionOrdenEstados.INICIADO}}, function (error) {
                            if (error) {
                                return res.status(500).json({estado: "error", msg: "ERROR: al intentar actualizar el estado de la orden de produccion a INICIADO"});
                            } else {
                                return res.status(200).json({estado: "ok", msg: "Producto Orden cambiado de estado a INICIADO"});
                            }
                        });
                    } else {
                        return res.status(200).json({estado: "error", msg: "ERROR: Ya existe una orden de produccion iniciada para este producto, por tanto no se puede iniciar nuevamente"});
                    }
                    
                }
            });
        } else {
            return res.status(200).json({estado: "error", msg: "ERROR: Debe indicar el id_producto de produccion_orden que desea INICIAR"});
        }
        
    } else {
        return res.status(200).json({estado: "error", msg: "ERROR: Debe indicar la cantidad_producir y ser mayor que cero"});
    }

});

/**
 * API Rest Cancelar ProductoOrden
 * Descripcion: Cambia de estado de la produccion_orden a CANCELADO. Solo es posible hacerlo si el estado actual es INICIADO
 * Ruta: /cancelar
 * Metodo: POST
 * Datos de entrada: { "id_producto": "61bbbeae9953cce7e56890a6" }
 * Respuesta: { "estado": "ok", "msg": "Producto Orden cambiado de estado a CANCELADO" }
 */
produccionOrdenRutas.post("/cancelar", function(req, res) {
    //desestructuracion
    const data = req.body;
    const id_producto = data.id_producto;
    const motivo_cancelacion = data.motivo_cancelacion;

    //validamos que en la peticion se envie un id_producto para poder consultar el registro
    if (id_producto) {
        //Buscamos si existe un produccion_orden para el id producto recibido
        produccionOrdenModel.findOne({id_producto: id_producto}, function(error, infoProduccionOrden) {
            if (error) {
                return res.status(500).json({estado: "error", msg: "No se encontro ninguna produccion_orden con el id recibido"});            
            } else {
                //solo se permitira cancelar la produccion si esta en estado INICIADO
                if (infoProduccionOrden.estado === ProduccionOrdenEstados.INICIADO) {
                    produccionOrdenModel.updateOne({_id: infoProduccionOrden._id}, {$set:{estado: ProduccionOrdenEstados.CANCELADO, motivo_cancelacion}}, function (error) {
                        if (error) {
                            return res.status(500).json({estado: "error", msg: "ERROR: al intentar actualizar el estado de la orden de produccion a CANCELADO"});
                        } else {
                            return res.status(200).json({estado: "ok", msg: "Producto Orden cambiado de estado a CANCELADO"});
                        }
                    });
                } else {
                    return res.status(200).json({estado: "error", msg: `ERROR: La produccion_orden esta en estado ${infoProduccionOrden.estado}, por tanto no se puede CANCELAR`});
                }
                
            }
        });
    } else {
        return res.status(200).json({estado: "error", msg: "ERROR: Debe indicar el id_producto de produccion_orden que desea CANCELAR"});
    }

});

produccionOrdenRutas.post("/fabricado", function(req, res) {
    //desestructuracion
    const data = req.body;
    const id_producto = data.id_producto;

    //validamos que en la peticion se envie un id_producto para poder consultar el registro
    if (id_producto) {
        //Buscamos si existe un produccion_orden para el id producto recibido
        produccionOrdenModel.findOne({id_producto: id_producto}, function(error, infoProduccionOrden) {
            if (error) {
                return res.status(500).json({estado: "error", msg: "No se encontro ninguna produccion_orden con el id recibido"});            
            } else {
                //solo se permitira cambiar a estado FABRICADO si el estado actual es INICIADO
                if (infoProduccionOrden.estado === ProduccionOrdenEstados.INICIADO) {
                    const cantidad_fabricada = infoProduccionOrden.cantidad_producir;
                    produccionOrdenModel.updateOne({_id: infoProduccionOrden._id}, {$set:{cantidad_producir: null, estado: ProduccionOrdenEstados.FABRICADO}}, function (error) {
                        if (error) {
                            return res.status(500).json({estado: "error", msg: "ERROR: al intentar actualizar el estado de la orden de produccion a FABRICADO"});
                        } else {
                            produccionStockModel.findOne({id_producto: id_producto}, function(error, infoProduccionStock) {
                                if (error) {
                                    return res.status(500).json({estado: "error", msg: "ERROR: al intentar buscar por id la informacion de produccion_stocks"});
                                } else {
                                    console.log("infoProduccionStock: " + infoProduccionStock);
                                    if (infoProduccionStock) {
                                        const cantidad_nueva = infoProduccionStock.cantidad_disponible + cantidad_fabricada;
                                        produccionStockModel.updateOne({id_producto: id_producto}, {$set:{cantidad_disponible: cantidad_nueva}}, function(error) {
                                            if (error) {
                                                return res.status(500).json({estado: "error", msg: "ERROR: al intentar aumentar la informacion de produccion_stocks"});
                                            } else {
                                                return res.status(200).json({estado: "ok", msg: "Producto Orden cambiado de estado a FABRICADO"});
                                            }
                                        });
                                        
                                    } else {
                                        //Creamos json con informacion de data a registrar
                                        const dataProduccionStock = {
                                            id_producto: id_producto,
                                            cantidad_disponible: cantidad_fabricada
                                        };

                                        const produccionStock = new produccionStockModel(dataProduccionStock);
                                        produccionStock.save(function(error) {
                                            if (error) {
                                                return res.status(500).json({estado: "error", msg: "ERROR: al intentar crear el nuevo registro con la informacion de produccion_stocks"});
                                            } else {
                                                return res.status(200).json({estado: "ok", msg: "Producto Orden cambiado de estado a FABRICADO"});
                                            }
                                        });
                                    }
                                    
                                }
                            });
                        }
                    });
                } else {
                    return res.status(200).json({estado: "error", msg: "ERROR: La produccion_orden no se encuentra en estado INICIADA, por tanto no se puede pasar a estado FABRICADO"});
                }
                
            }
        });
    } else {
        return res.status(200).json({estado: "error", msg: "ERROR: Debe indicar el id_producto de produccion_orden que desea cambiar a estado FABRICADO"});
    }
        
});

exports.produccionOrdenRutas = produccionOrdenRutas;