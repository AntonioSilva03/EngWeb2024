var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET Lista de compositores */
router.get('/', function (req, res, next) {
  axios.get('http://localhost:3000/compositores?_sort=nome').then(resp => {
    var compositores = resp.data;
    res.status(200).render('listaCompositores', { titulo: "Lista de Compositores", "Compositores": compositores });
  }).catch(erro => {
    res.status(501).render('error', { error: erro })
  });
});

/* GET Editar Compositor */
router.get('/edit/:id', function (req, res, next) {
  axios.get('http://localhost:3000/compositores/' + req.params.id).then(resp => {
    var compositor = resp.data;
    res.status(200).render('editarCompositor', { titulo: "Editar Compositor: " + compositor.nome, "compositor": compositor });
  }).catch(erro => {
    res.status(503).render('error', { error: erro })
  });
});

/* GET Apagar Compositor */
router.get('/delete/:id', function (req, res, next) {
  axios.delete('http://localhost:3000/compositores/' + req.params.id).then(resp => {
    res.status(200).redirect('/compositores');
  }).catch(erro => {
    res.status(504).render('error', { error: erro })
  });
});

/* GET Adicionar Compositor */
router.get('/add', function (req, res, next) {
  res.status(200).render('adicionarCompositor', { titulo: "Novo Compositor" });
});

/* GET Página do Compositor */
router.get('/:id', function (req, res, next) {
  axios.get('http://localhost:3000/compositores/' + req.params.id).then(resp => {
    var compositor = resp.data;
    res.status(200).render('paginaCompositor', { titulo: "Compositor: " + compositor.nome, "compositor": compositor });
  }).catch(erro => {
    res.status(502).render('error', { error: erro })
  });
});

/* POST Editar Compositor */
router.post('/edit/:id', function (req, res, next) {
  axios.get('http://localhost:3000/periodos?nome=' + req.body.periodo).then(resp => {
    console.log(resp.data)
    if (resp.data != "") {
      axios.put('http://localhost:3000/compositores/' + req.params.id, req.body).then(resp => {
        res.status(200).redirect('/compositores/' + req.params.id);
      }).catch(erro => {
        res.status(505).render('error', { error: erro })
      });
    } else {
      axios.post('http://localhost:3000/periodos', { "nome": req.body.periodo }).then(resp => {
        console.log(req.body.periodo);
        axios.put('http://localhost:3000/compositores/' + req.params.id, req.body).then(resp => {
          console.log(req.params.id);
          res.status(200).redirect('/compositores/' + req.params.id);
        }).catch(erro => {
          res.status(506).render('error', { error: erro })
        });
      }).catch(erro => {
        res.status(507).render('error', { error: erro })
      });
    }
  }).catch(erro => {
    res.status(508).render('error', { error: erro })
  });
});

/* POST Adicionar Compositor */
router.post('/add', function (req, res, next) {
  axios.get('http://localhost:3000/periodos?nome=' + req.body.periodo).then(resp => {
    if (resp.data != "") {
      axios.post('http://localhost:3000/compositores', req.body).then(resp => {
        res.status(200).redirect('/compositores/' + req.body.id);
      }).catch(erro => {
        res.status(509).render('error', { error: erro })
      });
    } else {
      axios.post('http://localhost:3000/periodos', { "nome": req.body.periodo }).then(resp => {
        axios.post('http://localhost:3000/compositores', req.body).then(resp => {
          res.status(200).redirect('/compositores/' + req.body.id);
        }).catch(erro => {
          res.status(510).render('error', { error: erro })
        });
      }).catch(erro => {
        res.status(511).render('error', { error: erro })
      });
    }
  }).catch(erro => {
    res.status(512).render('error', { error: erro })
  });
});

module.exports = router;