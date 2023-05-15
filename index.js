const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require("cors");
const conexionDB = require("./db/config");

const createRoles = require ('./libs/startSetup');
const authRouter = require("./routes/auth");
const newsRouter = require("./routes/crudNews");

//Creamos el servidor
const app = express();
createRoles();

require("dotenv").config();

//Conexion a BD Mongo
conexionDB();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
//Configuring cookie-parser
app.use(cookieParser());

//Definimos las rutas
app.use('/', express.static(__dirname +"/public"));
app.use("/auth", authRouter);
app.use("/crudNews", newsRouter);

app.get("/auth", authRouter);

app.listen(process.env.PORT , () =>{
    console.log(`Aplicacion corriento EXITOSAMENTE en el puerto ${process.env.PORT}`);
});