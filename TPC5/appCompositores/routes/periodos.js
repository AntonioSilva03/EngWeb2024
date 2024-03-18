var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET Lista de períodos */
router.get('/', function (req, res, next) {
    axios.get('http://localhost:3000/periodos?_sort=nome').then(resp => {
        var periodos = resp.data;
        res.status(200).render('listaPeriodos', { titulo: "Lista de Períodos", "Periodos": periodos });
    }).catch(erro => {
        res.status(513).render('error', { error: erro })
    });
});

/* GET Adicionar Período */
router.get('/add', function (req, res, next) {
    res.status(200).render('adicionarPeriodo', { titulo: "Novo Período" });
});

/* GET Página do Período */
router.get('/:nome', function (req, res, next) {
    axios.get('http://localhost:3000/compositores?_sort=nome').then(resp => {
        var periodo = req.params.nome;
        var compositoresPeriodo = resp.data.filter(compositor => compositor.periodo == periodo);
        res.status(200).render('paginaPeriodo', { titulo: "Período " + periodo, "compositores": compositoresPeriodo });
    }).catch(erro => {
        res.status(514).render('error', { error: erro })
    });
});

/* POST Adicionar Período */
router.post('/add', function (req, res, next) {
    axios.post('http://localhost:3000/periodos', req.body).then(resp => {
        res.status(200).redirect('/periodos');
    }).catch(erro => {
        res.status(515).render('error', { error: erro })
    });
});

module.exports = router;