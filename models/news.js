const {Schema, model} = require("mongoose");

const noticias = new Schema({
    titulo: {
        type: String,
        required: true,
        trim: true,        
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "usuario",
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = model("noticias", noticias);