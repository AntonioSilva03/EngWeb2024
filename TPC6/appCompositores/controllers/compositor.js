var Compositor = require('../models/compositor');
var Periodo = require('../models/periodo');

module.exports.list = () => {
    return Compositor
        .find()
        .sort({ nome: 1 })
        .exec()
}

module.exports.findByID = (id) => {
    return Compositor
        .findOne({ _id: id })
        .exec()
}

module.exports.remove = (id) => {
    return Compositor
        .findByIdAndDelete(id)
        .exec()
}

exports.updateCompositor = function(req, res) {
    Periodo.findOne({ nome: req.body.periodo })
        .then(periodo => {
            if (periodo) {
                updateCompositorWithPeriodo(req, res);
            } else {
                createPeriodoAndCompositor(req, res);
            }
        })
        .catch(erro => {
            res.status(505).render('error', { error: erro });
        });
}

function updateCompositorWithPeriodo(req, res) {
    Compositor.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(compositor => {
            res.status(200).redirect('/compositores/' + compositor.id);
        })
        .catch(erro => {
            res.status(506).render('error', { error: erro });
        });
}

function createPeriodoAndCompositor(req, res) {
    const newPeriodo = new Periodo({ nome: req.body.periodo });
    newPeriodo.save()
        .then(() => {
            updateCompositorWithPeriodo(req, res);
        })
        .catch(erro => {
            res.status(507).render('error', { error: erro });
        });
}

exports.insertCompositorTest = function(req, res) {
    Periodo.findOne({ nome: req.body.periodo })
        .then(periodo => {
            if (periodo) {
                insertCompositor(req, res);
            } else {
                createPeriodoAndInsertCompositor(req, res);
            }
        })
        .catch(erro => {
            res.status(508).render('error', { error: erro });
        });
}

function insertCompositor(req, res) {
    var novoCompositor = new Compositor(req.body);
    novoCompositor.save()
        .then(compositor => {
            res.status(200).redirect('/compositores/' + compositor.id);
        })
        .catch(erro => {
            res.status(509).render('error', { error: erro });
        });
}

function createPeriodoAndInsertCompositor(req, res) {
    let id = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 4; i++) {
        id += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    const newPeriodo = new Periodo({ _id: id, nome: req.body.periodo });
    newPeriodo.save()
        .then(() => {
            insertCompositor(req, res);
        })
        .catch(erro => {
            res.status(510).render('error', { error: erro });
        });
}