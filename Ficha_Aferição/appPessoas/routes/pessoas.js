var express = require('express');
var router = express.Router();

const Pessoa = require('../controllers/pessoa')

/* GET Lista de Pessoas */
router.get('/', function (req, res, next) {
    Pessoa.list().then(pessoas => {
        res.status(200).render('listaPessoas', { titulo: "Lista de Pessoas", "Pessoas": pessoas });
    }).catch(erro => {
        res.status(501).render('error', { error: erro })
    });
});

/* POST Inserir Lista de Pessoas */
router.post('/', function (req, res, next) {
    Pessoa.insert(req.body).then(res.redirect('/pessoas')).catch(erro => {
        res.status(507).render('error', { error: erro })
    });
});

/* GET Editar Pessoa */
router.get('/edit/:id', function (req, res, next) {
    Pessoa.findByID(req.params.id).then(pessoa => {
        res.status(200).render('editarPessoa', { titulo: "Editar Pessoa: " + pessoa.nome, "pessoa": pessoa });
    }).catch(erro => {
        res.status(502).render('error', { error: erro })
    });
});

/* GET Apagar Pessoa */
router.get('/delete/:id', function (req, res, next) {
    Pessoa.remove(req.params.id).then(resp => {
        res.status(200).redirect('/pessoas');
    }).catch(erro => {
        res.status(503).render('error', { error: erro })
    });
});

/* GET Adicionar Pessoa */
router.get('/add', function (req, res, next) {
    res.status(200).render('adicionarPessoa', { titulo: "Nova Pessoa" });
});

/* GET Página da Pessoa */
router.get('/:id', function (req, res, next) {
    Pessoa.findByID(req.params.id).then(pessoa => {
        res.status(200).render('paginaPessoa', { titulo: "Pessoa: " + pessoa.nome, "pessoa": pessoa });
    }).catch(erro => {
        res.status(504).render('error', { error: erro })
    });
});

/* POST Adicionar Pessoa */
router.post('/add', function (req, res, next) {
  Pessoa.insert({
    nome: req.body.nome,
    idade: req.body.idade,
    sexo: req.body.sexo,
    morada: {
      cidade: req.body.cidade,
      distrito: req.body.distrito
    },
    BI: req.body.BI,
    CC: req.body.CC,
    descricao: req.body.descricao,
    profissao: req.body.profissao,
    partido_politico: {
      party_abbr: req.body.party_abbr,
      party_name: req.body.party_name
    },
    religiao: req.body.religiao,
    desportos: req.body.desportos.split(','),
    animais: req.body.animais.split(','),
    figura_publica_pt: req.body.figura_publica_pt.split(','),
    marca_carro: req.body.marca_carro,
    destinos_favoritos: req.body.destinos_favoritos.split(','),
    atributos: {
      fumador: req.body.fumador === 'on',
      gosta_cinema: req.body.gosta_cinema === 'on',
      gosta_viajar: req.body.gosta_viajar === 'on',
      acorda_cedo: req.body.acorda_cedo === 'on',
      gosta_ler: req.body.gosta_ler === 'on',
      gosta_musica: req.body.gosta_musica === 'on',
      gosta_comer: req.body.gosta_comer === 'on',
      gosta_animais_estimacao: req.body.gosta_animais_estimacao === 'on',
      gosta_dancar: req.body.gosta_dancar === 'on',
      comida_favorita: req.body.comida_favorita
    }
  }).then(resp => {
    res.status(200).redirect('/pessoas');
  }).catch(erro => {
    res.status(505).render('error', { error: erro })
  });
});

/* POST Editar Pessoa */
router.post('/edit/:id', function (req, res, next) {
    Pessoa.update(req.params.id, {
        nome: req.body.nome,
        idade: req.body.idade,
        sexo: req.body.sexo,
        morada: {
          cidade: req.body.cidade,
          distrito: req.body.distrito
        },
        BI: req.body.BI,
        CC: req.body.CC,
        descricao: req.body.descricao,
        profissao: req.body.profissao,
        partido_politico: {
          party_abbr: req.body.party_abbr,
          party_name: req.body.party_name
        },
        religiao: req.body.religiao,
        desportos: req.body.desportos ? req.body.desportos.split(',') : [],
        animais: req.body.animais ? req.body.animais.split(',') : [],
        figura_publica_pt: req.body.figura_publica_pt ? req.body.figura_publica_pt.split(',') : [],
        marca_carro: req.body.marca_carro,
        destinos_favoritos: req.body.destinos_favoritos ? req.body.destinos_favoritos.split(',') : [],
        atributos: {
            fumador: req.body.fumador === 'on',
            gosta_cinema: req.body.gosta_cinema === 'on',
            gosta_viajar: req.body.gosta_viajar === 'on',
            acorda_cedo: req.body.acorda_cedo === 'on',
            gosta_ler: req.body.gosta_ler === 'on',
            gosta_musica: req.body.gosta_musica === 'on',
            gosta_comer: req.body.gosta_comer === 'on',
            gosta_animais_estimacao: req.body.gosta_animais_estimacao === 'on',
            gosta_dancar: req.body.gosta_dancar === 'on',
            comida_favorita: req.body.comida_favorita
        }
    }).then(resp => {
        res.status(200).redirect('/pessoas');
    }).catch(erro => {
        res.status(506).render('error', { error: erro })
    });
});

module.exports = router;
