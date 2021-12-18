const { Router } = require("express");
const usuarioRutas = Router();
const Usuario = require("../modelos/usuariosModel");

/**
 * API Rest Login
 * Descripcion: Usada para validar el login en la aplicacion
 * Ruta: /login
 * Metodo: POST
 * Datos de entrada: {"usuario": "mcabales@correo.com", "contrasena": "1234"}
 * Respuesta: { "estado": "ok", "msg": "Usuario encontrado", "data": { "numero_identificacion": 1024587789, "nombres": "maria", "apellidos": "cabrales", "usuario": "mcabales@correo.com", "rol": "ADMINISTRATOR" } }
 */
 usuarioRutas.post("/login", function(req, res) {
	//Obtenemos la información de los campos que vienen en el JSON
    //Capturar usuario y contrasena
    const {usuario, contrasena} = req.body;
	
	Usuario.findOne({ usuario }, function (error, usuarioEncontrado) { /**Busca por usuario */
		if (error) {
			return res.status(500).json({estado: "error", msg: "ERROR: al consultar el usuario"});
		} else {
			if (usuarioEncontrado) {
				if (usuarioEncontrado.contrasena === contrasena) {
					//creamos objeto con la data que se enviara al front
					const dataResult = {
						numero_identificacion: usuarioEncontrado.numero_identificacion,
						nombres: usuarioEncontrado.nombres,
						apellidos: usuarioEncontrado.apellidos,
						usuario: usuarioEncontrado.usuario,
						rol: usuarioEncontrado.rol
					}
					usuarioEncontrado.contrasena = null;
					return res.status(200).json({estado: "ok", msg: "Usuario encontrado", data: dataResult});
				} else {
					//Se encontro un usuario pero no coincidio la contrasena
					return res.status(200).json({estado: "error", msg: "Credenciales invalidas"});
				}
				
			} else {
				//no se encontro una coincidencia para el usuario buscado
				return res.status(200).json({estado: "error", msg: "Credenciales invalidas"});
			}
		}
	});
});

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