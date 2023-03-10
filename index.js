const express = require('express');
const cors = require("cors");
const conexionDB = require("./db/config");

const authRouter = require("./routes/auth");
const newsRouter = require("./routes/crudNews");

const app = express();
require("dotenv").config();

conexionDB();

app.use(express.json());
app.use(cors());

app.use('/', express.static(__dirname +"/public"));
app.use("/auth", authRouter);
app.use("/crudNews", newsRouter);

app.listen(process.env.PORT , () =>{
    console.log(`Aplicacion corriento EXITOSAMENTE en el puerto ${process.env.PORT}`);
});