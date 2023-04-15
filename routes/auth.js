const {Router} = require("express");
const authRouter = Router();
const { check } = require("express-validator");
const { registerUser , loginUser, deleteUser, updateUsuario } = require("../controllers/authControllers");
const validationErrors = require("../middlewares/validationErrors");
const User = require("../models/usuario");

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

authRouter.get('/user', async (req, res) => {
    try {
        const user = await User.find();
        if(!user){
            return res.json({msg: "Usuario no encontrado"})
        }return res.json({user: user})
    } catch (error) {
        return res.json({error: error})
    }
});

authRouter.delete('/:id', deleteUser)

authRouter.put('/:id', updateUsuario);

module.exports = authRouter;