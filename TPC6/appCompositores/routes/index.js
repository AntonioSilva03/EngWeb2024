var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('paginaInicial', { titulo: 'Página Inicial' });
});

module.exports = router;
