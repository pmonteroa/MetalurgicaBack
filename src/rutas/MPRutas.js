const { Router } = require("express");
const MPRutas = Router();
const MP = require("../modelos/MPModel");

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

