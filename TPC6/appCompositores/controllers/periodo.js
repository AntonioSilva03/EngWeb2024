var Periodo = require('../models/periodo');

module.exports.list = () => {
    return Periodo
        .find()
        .sort({ nome: 1 })
        .exec()
}

module.exports.findByNome = (nome) => {
    return Periodo
        .findOne({ nome: nome })
        .exec()
}

module.exports.insert = (periodo) => {
    let id = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 4; i++) {
        id += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    var novoPeriodo = new Periodo({ _id: id, nome: periodo })
    return novoPeriodo.save()
}