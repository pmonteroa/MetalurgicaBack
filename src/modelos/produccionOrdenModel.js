//modelo sirve para poder crear, actualizar etc y el schema es el que define la estructura
//collection es parecido a tabla
const {model, Schema} = require("mongoose")

//Constantes usada para centralizar los estados de produccion_orden
const ProduccionOrdenEstados = Object.freeze({
    NO_INICIADO: 'NO_INICIADO',
    INICIADO: 'INICIADO',
    CANCELADO: 'CANCELADO',
    FABRICADO: 'FABRICADO'
});

//Schema es la estructura que tendra nuestros documentos (es como la tabla en ER)
//En el constructor especifico los campos que manejará el modelo
const produccionOrdenSchema = new Schema({
    // relacion con la collection de productos. En ref va el nombre de la collection con la que se relaciona (como se llama la collection en la DB)
    id_producto: {
        type: Schema.ObjectId,
        required: true,
        ref: "productos"
    },
    cantidad_producir: {
        type: "number",
        required: false
    },
    estado: {
        type: "string",
        enum: Object.values(ProduccionOrdenEstados),
        required: true
    },
    motivo_cancelacion: {
        type: "string",
        required: false
    }
});

Object.assign(produccionOrdenSchema.statics, {
    ProduccionOrdenEstados
});


//le pasamos el nombre que va a tener "la tabla" y el esquema que es la estructura base
//El nombre debe ser en plural... dado que en pruebas observe que mongoDB colocaba una s al final sino se deja en plural
const produccionOrdenModel = model("produccion_ordenes", produccionOrdenSchema);

//exportamos
exports.produccionOrdenModel = produccionOrdenModel;
exports.ProduccionOrdenEstados = ProduccionOrdenEstados;