const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productosModel = new Schema({
        nombre: {
            type: "string",
            unique: true,
            required: true
        },
        valor: {
            type: "number",
            required: true
        },
        estado: {
            type: "string",
            require: true,
            default: "PENDING"
        },
        estado_eliminacion:{
            type: "number",
            require: true,
            default: 1
        }
    }
);

module.exports = mongoose.model("productos", productosModel);