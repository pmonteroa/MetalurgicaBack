const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MPModel = new Schema(
    {
        descripcion: {
            type: "string",
            unique: true,
            required: true
        },
        unidad_medida: {
            type: "string",
            required: true
        },
        
        stock: {
            type: "number",
            require: true
        },
        
        valor: {
            type: "number",
            require: true
        }
    }
);

module.exports = mongoose.model("Materia_Prima", MPModel);