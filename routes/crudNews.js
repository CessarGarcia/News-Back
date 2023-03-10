const {Router} = require("express");
const { check } = require("express-validator");
const { crearNoticia, readNoticia, updateNoticia, deleteNoticia } = require("../controllers/newsController");
const verifyToken = require("../middlewares/verifyToken");
const validationErrors = require("../middlewares/validationErrors");

const newsRouter = Router();

newsRouter.post("/create", 
    [
        check("titulo", "Titulo de la noticia obligatorio").not().isEmpty(),
        validationErrors,
        verifyToken,
    ],
    crearNoticia
);

newsRouter.get("/read", [verifyToken], readNoticia);

newsRouter.put("/update/:id",
    [
        check("titulo", "Titulo de la noticia obligatorio").not().isEmpty(), 
        validationErrors,
        verifyToken,
    ],
        updateNoticia
);

newsRouter.delete("/delete/:id", [verifyToken], deleteNoticia);

module.exports = newsRouter;