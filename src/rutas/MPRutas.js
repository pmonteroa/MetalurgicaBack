const { Router } = require("express");
const MPRutas = Router();
const MP = require("../modelos/MPModel");

/**
 * API Rest Consultar Materia Prima
 * Descripcion: Consulta MP en la BD
 * Ruta: /buscar
 * Metodo: POST
 * Datos de entrada: {descripcion: "prueba"}
 * Respuesta: {estado: "ok", msg:"MP encontrada", data: {id: "xxxx" descripción: "prueba",unidad_medida: "xxxx", stock: "xxx", valor: 200}}
 */
 MPRutas.post("/consultar", function (req, res) {
    const { descripcion } = req.body;
    MP.findOne({ descripcion }, function (error, desc) { /**Busca por descripcion */
        if(error){
            return res.send({estado: "error", msg: "ERROR: Al buscar"});
        }else{
            if(desc!== null){
                return res.send({estado: "ok", msg: "Materia Prima Encontrada", data: desc});
            } else {
                return res.send({estado: "ok", msg: "Materia Prima no Encontrada"});
            }
        }
    });
});

/**
 * API Rest Consultar toda la MP de la BD*/
MPRutas.post("/listar", function (req, res) {
    MP.find({}, function (error, prod) {
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
 * API Rest Guardar MP
 * Descripcion: Guarda un nuevo producto en la BD
 * Ruta: /guardar
 * Metodo: POST
 * Datos de entrada: {nombre: "prueba", unidad_medida: "xxxxx" ,valor: 200}
 * Respuesta: {estado: "ok", msg:"producto guardado"}
 */
 MPRutas.post("/guardar", function (req, res) { //la variable req, es todo lo que manda el cliente
    // Desestructuración
    const data = req.body; /**los datos se guardan en la variable "data" */
    const prod = new MP(data); /**Instanciamos el modelo Materia Prima */
    prod.save(function (error) {
        if(error){
            return res.send({estado: "error", msg: "ERROR al guardar MP"});
        }else{
            res.send({estado: "ok", msg: "Guardado con exito"});
        }

    });
});

exports.MPRutas = MPRutas;

