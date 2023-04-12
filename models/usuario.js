const {Schema, model} = require("mongoose");

const usuario = new Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        unique: true,
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'UNVERIFIED'
    }
});

module.exports = model("usuario", usuario);