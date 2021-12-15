const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productosModel = new Schema(
    {
        nombre: {
            type: "string",
            unique: true,
            required: true
        },
        unidad_medida: {
            type: "string",
            required: true
        },
        valor: {
            type: "number",
            require: true
        }
    }
);

module.exports = mongoose.model("productos", productosModel);