const { Router } = require("express");
const { produccionOrdenModel, ProduccionOrdenEstados } = require("../modelos/produccionOrdenModel");
const productoRutas = Router();
const Producto = require("../modelos/productosModel");

/**
 * API Rest Consultar Producto
 * Descripcion: Consulta un nuevo producto en la BD
 * Ruta: /consultar
 * Metodo: POST
 * Datos de entrada: {nombre: "prueba"}
 * Respuesta: {estado: "ok", msg:"producto encontrado", data: {id: "xxxx" nombre: "prueba",unidad_medida: "xxxx", valor: 200}}
 */
 productoRutas.post("/consultar", function (req, res) {
    const { nombre } = req.body;
    Producto.findOne({ nombre }, function (error, prod) { /**Busca por el nombre */
        if(error){
            return res.send({estado: "error", msg: "ERROR: Al buscar"});
        }else{
            if(prod!== null){
                return res.send({estado: "ok", msg: "Producto Encontrado", data: prod});
            } else {
                return res.send({estado: "ok", msg: "Producto NO Encontrado"});
            }
        }
    });
});


/**
 * API Rest Consultar todos los productos de la BD*/
productoRutas.post("/listar", function (req, res) {
    Producto.find({}, function (error, prod) {
        if (error) {
            return res.send({ estado: "error", msg: "ERROR: Al buscar" });
        } else {
            if (prod !== null) {
                return res.send({ estado: "ok", msg: "Producto Encontrado", data: prod });
            } else {
                return res.send({ estado: "error", msg: "Producto NO Encontrado" });
            }
        }
    })
});

/**
 * API Rest Guardar Producto
 * Descripcion: Guarda un nuevo producto en la BD
 * Ruta: /guardar
 * Metodo: POST
 * Datos de entrada: {nombre: "prueba", unidad_medida: "xxxxx" ,valor: 200}
 * Respuesta: {estado: "ok", msg:"producto guardado"}
 */
 productoRutas.post("/guardar", function (req, res) { //la variable req, es todo lo que manda el cliente
    // Desestructuración
    const data = req.body; /**los datos se guardan en la variable "data" */
    const prod = new Producto(data); /**Instanciamos el modelo Producto */
    prod.save(function (error, productoGuardado) {
        if(error){
            return res.send({estado: "error", msg: "ERROR al guardar el producto"});
        } else {
            //creamos un objeto con la informacion necesaria para insertar en produccionOrden
            const dataProduccionOrden = {
                id_producto: productoGuardado._id,
                estado: ProduccionOrdenEstados.NO_INICIADO
            };

            console.log("dataProduccionOrden: " + dataProduccionOrden)

            const produccionOrden = new produccionOrdenModel(dataProduccionOrden);

            produccionOrden.save(function (error) {
                if (error) {
                    res.send({estado: "ok", msg: "Producto Guardado pero no se guardo produccion_orden"});
                } else {
                    res.send({estado: "ok", msg: "Guardado con exito"});
                }

            });
        }

    });
});

exports.productoRutas = productoRutas;