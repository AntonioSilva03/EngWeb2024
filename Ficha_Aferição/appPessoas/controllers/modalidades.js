var Pessoa = require('../models/pessoa');
var mongoose = require('mongoose');

module.exports.list = () => {
    return Pessoa.distinct('desportos').then(modalidades => {
        modalidades.sort();
        return modalidades;
    });
}

module.exports.findByID = id => {
    return Pessoa.find({desportos: {$in: id}}).then(pessoas =>{
        return pessoas.sort((a,b) => a.nome.localeCompare(b.nome));
    });
}