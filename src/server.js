const express = require("express");
const cors = require("cors"); //libreria para permitir las conexiones desde otra ubicacion
const app = express();
const mongoose = require ("mongoose"); /**Libreria Mongo */
const Producto = require ("./modelos/productosModel"); /**Esquema de los productos */
const { productoRutas } = require("./rutas/productoRutas"); /**Exportar las rutas de productos */

const MateriaPrima = require ("./modelos/MPModel"); /**Esquema de la MP */
const { MPRutas } = require("./rutas/MPRutas"); /**Exportar las rutas de MP */

const Usuario = require ("./modelos/usuariosModel"); /**Esquema de los productos */
const { usuarioRutas } = require("./rutas/usuarioRutas"); /**Exportar las rutas de productos */

const { produccionOrdenRutas } = require("./rutas/produccionOrdenRutas"); /**Exportar las rutas de produccion */

app.use(cors()); /** Indicando que permita acceder a las API desde cualquier ubicacion */
app.use(express.json()); //Middleware convertir json()
require("dotenv").config(); /**Importar para poder manipular las variables de entorno */

// Prefijos para llamar las rutas de las APIs
app.use("/producto", productoRutas); /**Prefijo para referirse a las APIS de las rutas producto */
app.use("/materia_prima", MPRutas); /**Prefijo para referirse a las APIS de las rutas materia prima */
app.use("/usuario", usuarioRutas); /**Prefijo para referirse a las APIS de las rutas usuario */
app.use("/produccion_orden", produccionOrdenRutas); /**Prefijo para referirse a las APIS de las rutas produccion */

//Establecer conexion con la base de datos
mongoose.connect(process.env.MONGODB_SERVER_URL)
    .then(res=> console.log("Conectado.db"))
    .catch(error=> console.log(error));


app.listen(8080, () =>{
    console.log("Servidor escuchando en el puerto 8080")
});