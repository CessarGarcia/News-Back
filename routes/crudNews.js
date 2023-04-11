const {Router} = require("express");
const newsRouter = Router();
const { check } = require("express-validator");
const verifyToken = require("../middlewares/verifyToken");
const validationErrors = require("../middlewares/validationErrors");

const newsController = require("../controllers/newsController");

newsRouter.post('/', newsController.crearNoticia);
newsRouter.get('/', newsController.readNoticias);
newsRouter.put('/:id', newsController.updateNoticia);
newsRouter.get('/:id', newsController.readNoticia);
newsRouter.delete('/:id', newsController.deleteNoticia);

module.exports = newsRouter;