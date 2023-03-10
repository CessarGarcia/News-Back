const noticiasModel = require("../models/news");

const crearNoticia = async (req, res) =>{
    const {titulo} = req.body;
    const id = req.uid;
    
    const nuevaNoticia = new noticiasModel({titulo, creator:id});

    await nuevaNoticia.save();

    res.status(200).json({
        ok: true,
        msg: "Noticia creada con exito",
        nuevaNoticia,
    });
};

const readNoticia = async (req, res) => {
    const id = req.uid;

    try {
        //Ordena los datos de forma descendiente y se ordena segun el creador 
        const noticia = await noticiasModel.find({creator: id}).sort({createdAt:-1}) 
        
        return res.json({
            ok: true,
            noticia,
        });
    } catch (error) {
        return res.status(404).json({
            ok: true,
            msg: "Noticia no encontrada",

        });
    }
};

const updateNoticia = async(req, res) =>{
    const {id} = req.params;
    const {titulo} = req.body;

    try {
        const noticia = await noticiasModel.findByIdAndUpdate(id, {titulo}, {new: true});
        return res.json({
            ok: true,
            noticia,
            msg: "Noticia actualizada"
        });
    } catch (error) {
        return res.status(404).json({
            ok: true,
            msg: "Noticia no actualizada",

        });
    }
};

const deleteNoticia = async(req, res) =>{
    const {id} = req.params;

    try {
        const noticia = await noticiasModel.findByIdAndRemove(id);
        return res.json({
            ok: true,
            msg: "Noticia borrada correctamente",
            noticia,
        });
    } catch (error) {
        return res.status(404).json({
            ok: true,
            msg: "Noticia no eliminada",

        });
    }
};

module.exports = {crearNoticia, readNoticia, updateNoticia, deleteNoticia};