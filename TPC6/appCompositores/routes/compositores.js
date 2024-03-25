var express = require('express');
var router = express.Router();

const Compositor = require('../controllers/compositor')

/* GET Lista de compositores */
router.get('/', function (req, res, next) {
    Compositor.list().then(compositores => {
        res.status(200).render('listaCompositores', { titulo: "Lista de Compositores", "Compositores": compositores });
    }).catch(erro => {
        res.status(501).render('error', { error: erro })
    });
});

/* GET Editar Compositor */
router.get('/edit/:id', function (req, res, next) {
    Compositor.findByID(req.params.id).then(compositor => {
        res.status(200).render('editarCompositor', { titulo: "Editar Compositor: " + compositor.nome, "compositor": compositor });
    }).catch(erro => {
        res.status(502).render('error', { error: erro })
    });
});

/* GET Apagar Compositor */
router.get('/delete/:id', function (req, res, next) {
    Compositor.remove(req.params.id).then(resp => {
        res.status(200).redirect('/compositores');
    }).catch(erro => {
        res.status(503).render('error', { error: erro })
    });
});

/* GET Adicionar Compositor */
router.get('/add', function (req, res, next) {
    res.status(200).render('adicionarCompositor', { titulo: "Novo Compositor" });
});

/* GET Página do Compositor */
router.get('/:id', function (req, res, next) {
    Compositor.findByID(req.params.id).then(compositor => {
        res.status(200).render('paginaCompositor', { titulo: "Compositor: " + compositor.nome, "compositor": compositor });
    }).catch(erro => {
        res.status(504).render('error', { error: erro })
    });
});

/* POST Editar Compositor */
router.post('/edit/:id', function (req, res, next) {
    Compositor.updateCompositor(req,res)
});

/* POST Adicionar Compositor */
router.post('/add', function (req, res, next) {
    Compositor.insertCompositorTest(req,res)
});

/* POST Apagar Compositor */
router.post('/delete/:id', function (req, res, next) {
    Compositor.remove(req.params.id).then(resp => {
        res.status(200).redirect('/compositores');
    }).catch(erro => {
        res.status(505).render('error', { error: erro })
    });
});

module.exports = router;