var express = require('express');
var router = express.Router();

const Compositor = require('../controllers/compositor')
const Periodo = require('../controllers/periodo')

/* GET Lista de períodos */
router.get('/', function (req, res, next) {
    Periodo.list(req, res).then(periodos => {
        res.status(200).render('listaPeriodos', { titulo: "Lista de Períodos", "Periodos": periodos });
    }).catch(erro => {
        res.status(511).render('error', { error: erro })
    });
});

/* GET Adicionar Período */
router.get('/add', function (req, res, next) {
    res.status(200).render('adicionarPeriodo', { titulo: "Novo Período" });
});

/* GET Página do Período */
router.get('/:nome', function (req, res, next) {
    Compositor.list().then(resp => {
        var periodo = req.params.nome;
        var compositoresPeriodo = resp.filter(compositor => compositor.periodo == periodo);
        res.status(200).render('paginaPeriodo', { titulo: "Período " + periodo, "compositores": compositoresPeriodo });
    }).catch(erro => {
        res.status(512).render('error', { error: erro })
    });
});

/* POST Adicionar Período */
router.post('/add', function (req, res, next) {
    Periodo.insert(req.body.nome).then(resp => {
        res.status(200).redirect('/periodos');
    }).catch(erro => {
        res.status(513).render('error', { error: erro })
    });
});

module.exports = router;