const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Constantes usada para centralizar los estados de produccion_orden
const Roles = Object.freeze({
    ADMINISTRATOR: 'ADMINISTRATOR',
    PRODUCTION: 'PRODUCTION',
    INVENTORY: 'INVENTORY'
});


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
            enum: Object.values(Roles),
            require: true
        }
    }
);

module.exports = mongoose.model("usuarios", usuariosModel);
exports.Roles = Roles;