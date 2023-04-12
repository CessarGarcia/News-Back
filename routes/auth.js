const {Router} = require("express");
const { check } = require("express-validator");
const { registerUser , loginUser, confirm } = require("../controllers/authControllers");
const validationErrors = require("../middlewares/validationErrors");

const authRouter = Router();

authRouter.post("/register", 
    [
        check("email", "El formado es invalido").isEmail(),
        check("username", "El nombre de usuario es requerido").not().isEmpty(),
        check("password", "La contraseña debe contener minimo 6 caracteres").isLength({min: 6}),
        validationErrors,
    ], 
    registerUser );

authRouter.post("/login", 
    [
        check("email", "El formado es invalido").isEmail(),
        check("password", "La contraseña debe contener minimo 6 caracteres").isLength({min: 6}),
        validationErrors,
    ],
loginUser);

// authRouter.get(
//     'confirm/:token', 
//     [], 
//     confirm
// );


module.exports = authRouter;