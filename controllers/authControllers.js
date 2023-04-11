const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {validationResult} = require("express-validator");
const usuarioModel = require("../models/usuario");

const registerUser = async (req, res) =>{
    const {email, password, username } = req.body;

    try {
        let usuario = await usuarioModel.findOne({email});
        if(usuario){
            return res.status(501).json({
                ok: false, 
                msg: "Correo ya registrado"
            });
        }

        const nuevoUsuario = new usuarioModel({email, password, username });
        
        const salt = bcryptjs.genSaltSync(12);
        nuevoUsuario.password = bcryptjs.hashSync(password, salt);

        await nuevoUsuario.save();

        const payload ={
            id: nuevoUsuario.id,
        }

        //Con expiresIn Definimos que el token expira en 1800s = 30min
        jwt.sign(payload, process.env.SECRETA, {expiresIn: 1800}, (error, token) =>{
            res.json({
                ok: true,
                id: nuevoUsuario.id,
                username,
                msg: "Usuario Creado Correctamente",
                token
            });
        });
    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: "Error al registrar"
        });
    }
};

const loginUser = async (req, res) =>{
    const {email, password } = req.body;
    try {
        let usuario = await usuarioModel.findOne({email});
        if( !usuario){
            return res.status(401).json({
                ok: false, 
                msg: "Correo o contraseña incorrecta"
            });
        }
        const passwordValido = bcryptjs.compareSync(password, usuario.password)
        if( !passwordValido){
            return res.status(401).json({
                ok: false, 
                msg: "Correo o contraseña incorrecta"
            });
        }
        const payload ={
            id: usuario.id,
        }

        //Con expiresIn Definimos que el token expira en 1800s = 30min
        jwt.sign(payload, process.env.SECRETA, {expiresIn: 1800}, (error, token) =>{

            res.json({
                ok: true,
                id: usuario.id,
                username: usuario.username,
                msg: "Login Correcto",
                token
            });
        });

    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: "Error al registrar"
        });
    }
};

module.exports={
    loginUser,
    registerUser
};