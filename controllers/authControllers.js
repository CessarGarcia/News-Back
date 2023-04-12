const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const usuarioModel = require("../models/usuario");
const { getTokenData } = require("../config/jwt.config");
const { sendEmail } = require("../config/mail.config");
const { v4: uuidv4 } = require('uuid');

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

        // Generar el código
        const code = uuidv4();
        const nuevoUsuario = new usuarioModel({email, password, username, code });
        
        const salt = bcryptjs.genSaltSync(12);
        nuevoUsuario.password = bcryptjs.hashSync(password, salt);

        // Enviar el email
        await sendEmail(email, username, 'Este es un email de prueba');
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

const confirm = async () => {
    try {
        // Obtener el token
        const { token } = req.params;

        // Verificar la data
        const data = await getTokenData(token);

        if (data === null) {
            return res.json({
                success: false,
                msg: 'Error al obtener data'
            });
        }

        console.log(data);

        const { email, code } = data.data;

        //verificar existencia del usuario
        let usuario = await usuarioModel.findOne({ email }) || null;
        if (usuario === null) {
            return res.json({
                success: false,
                msg: 'Usuario no existe'
            });
        }

        // Verificar el código
        if (code !== user.code) {
            return res.redirect('/error.html')
        }
        // Actualizar usuario
        usuario.status = 'VERIFIED';
        await nuevoUsuario.save();
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            msg: 'Error al confirmar usuario'
        });
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        let usuario = await usuarioModel.findOne({ email });
        if (!usuario) {
            return res.status(401).json({
                ok: false,
                msg: "Correo o contraseña incorrecta"
            });
        }
        const passwordValido = bcryptjs.compareSync(password, usuario.password)
        if (!passwordValido) {
            return res.status(401).json({
                ok: false,
                msg: "Correo o contraseña incorrecta"
            });
        }
        const payload = {
            id: usuario.id,
        }

        //TODO: Con expiresIn Definimos que el token expira en 1800s = 30min
        jwt.sign(payload, process.env.SECRETA, { expiresIn: 1800 }, (error, token) => {

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

module.exports = {
    loginUser,
    confirm,
    registerUser 
};