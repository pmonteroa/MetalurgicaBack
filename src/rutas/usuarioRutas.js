const { Router } = require("express");
const usuarioRutas = Router();
const Usuario = require("../modelos/usuariosModel");

/**
 * API Rest Consultar Usuario
 * Descripcion: Consulta un nuevo usuario en la BD
 * Ruta: /consultar
 * Metodo: POST
 * Datos de entrada: {nombre: "prueba"}
 * Respuesta: {estado: "ok", msg:"usuario encontrado", data: {id: "xxxx" nombre: "prueba",unidad_medida: "xxxx", valor: 200}}
 */
 usuarioRutas.post("/consultar", function (req, res) {
    const { numero_identificacion } = req.body;
    Usuario.findOne({ numero_identificacion }, function (error, usu) { /**Busca por el nombre */
        if(error){
            return res.send({estado: "error", msg: "ERROR: Al buscar"});
        }else{
            if(usu!== null){
                return res.send({estado: "ok", msg: "Usuario Encontrado", data: usu});
            } else {
                return res.send({estado: "error", msg: "Usuario NO Encontrado"});
            }
        }
    });
});


/**
 * API Rest Consultar todos los usuarios de la BD*/
usuarioRutas.get("/listar", function (req, res) {
    Usuario.find({}, function (error, usu) {
        if (error) {
            return res.send({ estado: "error", msg: "ERROR: Al buscar" });
        } else {
            if (usu !== null) {
                return res.send({ estado: "ok", msg: "Usuario Encontrado", data: usu });
            } else {
                return res.send({ estado: "error", msg: "Usuario NO Encontrado" });
            }
        }
    })
});

/**
 * API Rest Guardar Usuario
 * Descripcion: Guarda un nuevo usuario en la BD
 * Ruta: /guardar
 * Metodo: POST
 * Datos de entrada: {nombre: "prueba", unidad_medida: "xxxxx" ,valor: 200}
 * Respuesta: {estado: "ok", msg:"usuario guardado"}
 */
 usuarioRutas.post("/guardar", function (req, res) { //la variable req, es todo lo que manda el cliente
    // Desestructuración
    const data = req.body; /**los datos se guardan en la variable "data" */
    const usu = new Usuario(data); /**Instanciamos el modelo Usuario */
    usu.save(function (error) {
        if(error){
            return res.send({estado: "error", msg: "ERROR al guardar el usuario"});
        }else{
            res.send({estado: "ok", msg: "Guardado con exito"});
        }

    });
});

exports.usuarioRutas = usuarioRutas;