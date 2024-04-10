var express = require('express');
var router = express.Router();

const Modalidade = require('../controllers/modalidades')

/* GET Lista de Modalidades */
router.get('/', function (req, res, next) {
    Modalidade.list().then(modalidades => {
        res.status(200).render('listaModalidades', { titulo: "Lista de Modalidades", "Modalidades": modalidades });
    }).catch(erro => {
        res.status(501).render('error', { error: erro })
    });
});

/* GET Página da Modalidade */
router.get('/:id', function (req, res, next) {
    Modalidade.findByID(req.params.id).then(modalidade => {
        res.status(200).render('paginaModalidade', { titulo: "Modalidade: " + modalidade.nome, "modalidade": modalidade });
    }).catch(erro => {
        res.status(504).render('error', { error: erro })
    });
});


module.exports = router;