//modelo sirve para poder crear, actualizar etc y el schema es el que define la estructura
//collection es parecido a tabla
const {model, Schema} = require("mongoose");

//Schema es la estructura que tendra nuestros documentos (es como la tabla en ER)
//En el constructor especifico los campos que manejará el modelo
const produccionStockSchema = new Schema({
    // relacion con la collection de productos. En ref va el nombre de la collection con la que se relaciona (como se llama la collection en la DB)
    id_producto: {
        type: Schema.ObjectId,
        required: true,
        ref: "productos"
    },
    cantidad_disponible: {
        type: "number",
        required: true
    }
});

//le pasamos el nombre que va a tener "la tabla" y el esquema que es la estructura base
//El nombre debe ser en plural... dado que en pruebas observe que mongoDB colocaba una s al final sino se deja en plural
const produccionStockModel = model("produccion_stocks", produccionStockSchema);

//exportamos
exports.produccionStockModel = produccionStockModel;
