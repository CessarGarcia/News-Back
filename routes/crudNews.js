const {Router} = require("express");
const newsRouter = Router();
const {verifyToken, iscreator} = require("../middlewares/verifyToken");


const newsController = require("../controllers/newsController");

newsRouter.post('/', [verifyToken, iscreator], newsController.crearNoticia);
newsRouter.get('/', newsController.readNoticias);
newsRouter.put('/:id', [verifyToken, iscreator], newsController.updateNoticia);
newsRouter.get('/:id', newsController.readNoticia);
newsRouter.delete('/:id', [verifyToken, iscreator], newsController.deleteNoticia);

module.exports = newsRouter;