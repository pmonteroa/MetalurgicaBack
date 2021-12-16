const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usuariosModel = new Schema(
    {
        numero_identificacion: {
            type: "number",
            unique: true,
            required: true
        },
        nombres: {
            type: "string",
            required: true
        },
        apellidos: {
            type: "string",
            required: true
        },
        usuario: {
            type: "string",
            unique: true,
            required: true
        },
        contrasena: {
            type: "string",
            required: true
        },
        rol: {
            type: "string",
            require: true
        }
    }
);

module.exports = mongoose.model("usuarios", usuariosModel);