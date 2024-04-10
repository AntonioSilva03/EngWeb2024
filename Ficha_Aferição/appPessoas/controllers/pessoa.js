var Pessoa = require('../models/pessoa');
var mongoose = require('mongoose');

module.exports.list = () => {
    return Pessoa
        .find()
        .sort({ nome: 1 })
        .exec()
}

module.exports.findByID = id => {
    return Pessoa
        .findOne({ _id: id })
        .exec()
}

module.exports.insert = p => {
    p._id = new mongoose.Types.ObjectId()
    var novo = new Pessoa(p)
    return novo.save()
}

module.exports.update = (id, p) => {
    return Pessoa
        .updateOne({ _id: id }, p)
        .exec()
}

module.exports.remove = id => {
    return Pessoa
        .deleteOne({ _id: id })
        .exec()
}