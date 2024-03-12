var http = require('http')
var axios = require('axios')
const { parse } = require('querystring');

var templates = require('./templates.js')
var static = require('./static.js')

function collectRequestBodyData(request, callback) {
    if (request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

var server = http.createServer((req, res) => {
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    if (static.staticResource(req)) {
        static.serverStaticResource(req, res)
    }
    else {
        switch (req.method) {
            case 'GET':
                // Página Inicial
                if (req.url == "/") {
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                    res.write(templates.paginaInicial(d))
                    res.end()
                } //Lista dos compositores
                else if (req.url == "/compositores") {
                    axios.get('http://localhost:3000/compositores?_sort=nome').then(resp => {
                        compositores = resp.data
                        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                        res.write(templates.listaCompositores(compositores, d))
                        res.end()
                    }).catch(erro => {
                        res.writeHead(501, { 'Content-Type': 'text/html; charset=utf-8' })
                        res.write("<p>Não foi possível obter a lista de compositores. Erro: " + erro + "</p>")
                        res.end()
                    })
                } //Pagina de um compositor
                else if (/\/compositores\/C[0-9]+/.test(req.url)) {
                    var id = req.url.split('/')[2]
                    axios.get('http://localhost:3000/compositores/' + id).then(resp => {
                        compositor = resp.data
                        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                        res.write(templates.paginaCompositor(compositor, d))
                        res.end()

                    }).catch(erro => {
                        res.writeHead(502, { 'Content-Type': 'text/html; charset=utf-8' })
                        res.write("<p>Não foi possível obter o compositor. Erro: " + erro + "</p>")
                        res.end()
                    })
                } //Página de editar um compositor
                else if (/\/compositores\/edit\/C[0-9]+/.test(req.url)) {
                    var id = req.url.split('/')[3]
                    axios.get('http://localhost:3000/compositores/' + id).then(resp => {
                        compositor = resp.data
                        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                        res.write(templates.editarCompositor(compositor, d))
                        res.end()

                    }).catch(erro => {
                        res.writeHead(502, { 'Content-Type': 'text/html; charset=utf-8' })
                        res.write("<p>Não foi possível obter o compositor. Erro: " + erro + "</p>")
                        res.end()
                    })
                } // Apagar um compositor
                else if (/\/compositores\/delete\/C[0-9]+/.test(req.url)) {
                    var id = req.url.split('/')[3]
                    axios.delete('http://localhost:3000/compositores/' + id).then(resp => {
                        res.writeHead(301, { 'Location': 'http://localhost:3001/compositores' })
                        res.end()
                    }).catch(erro => {
                        res.writeHead(503, { 'Content-Type': 'text/html; charset=utf-8' })
                        res.write("<p>Não foi possível apagar o compositor. Erro: " + erro + "</p>")
                        res.end()
                    })
                } // Página de adicionar um compositor
                else if (req.url == "/compositores/add") {
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                    res.write(templates.adicionarCompositor(d))
                    res.end()
                } // Lista dos períodos
                else if (req.url == "/periodos") {
                    axios.get('http://localhost:3000/periodos?_sort=nome').then(resp => {
                        periodos = resp.data
                        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                        res.write(templates.listaPeriodos(periodos, d))
                        res.end()
                    }).catch(erro => {
                        res.writeHead(504, { 'Content-Type': 'text/html; charset=utf-8' })
                        res.write("<p>Não foi possível obter a lista de períodos. Erro: " + erro + "</p>")
                        res.end()
                    })
                } // Adicionar um período
                else if (req.url == "/periodos/add") {
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                    res.write(templates.adicionarPeriodo(d))
                    res.end()
                }// Página de um período
                else if (/\/periodos\/[A-Za-z]+/.test(req.url)) {
                    var nome = req.url.split('/')[2]
                    axios.get('http://localhost:3000/compositores/').then(resp => {
                        compositores = resp.data
                        compositoresPeriodo = compositores.filter(compositor => compositor.periodo == nome)
                        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                        res.write(templates.paginaPeriodo(nome, compositoresPeriodo))
                        res.end()
                    }).catch(erro => {
                        res.writeHead(506, { 'Content-Type': 'text/html; charset=utf-8' })
                        res.write("<p>Não foi possível obter o periodo. Erro: " + erro + "</p>")
                        res.end()
                    })
                } // Caso de get erro
                else {
                    res.writeHead(507, { 'Content-Type': 'text/html; charset=utf-8' })
                    res.write("<h1>Erro: " + req.url + " GET request não suportado.</h1>")
                    res.end()
                }

                break

            case 'POST':
                // Post do editar compositor
                if (/\/compositores\/edit\/C[0-9]+/.test(req.url)) {
                    var id = req.url.split('/')[3]
                    collectRequestBodyData(req, result => {
                        axios.put('http://localhost:3000/compositores/' + id, result).then(resp => {
                            res.writeHead(301, { 'Location': 'http://localhost:3001/compositores/' + id })
                            res.end()
                        }).catch(erro => {
                            res.writeHead(508, { 'Content-Type': 'text/html; charset=utf-8' })
                            res.write("<p>Não foi possível editar o compositor. Erro: " + erro + "</p>")
                            res.end()
                        })
                    })
                }//Post de eliminar compositor
                else if (/\/compositores\/delete\/C[0-9]+/.test(req.url)) {
                    var id = req.url.split('/')[3]
                    axios.delete('http://localhost:3000/compositores/' + id).then(resp => {
                        res.writeHead(301, { 'Location': 'http://localhost:3001/compositores' })
                        res.end()
                    }).catch(erro => {
                        res.writeHead(509, { 'Content-Type': 'text/html; charset=utf-8' })
                        res.write("<p>Não foi possível apagar o compositor. Erro: " + erro + "</p>")
                        res.end()
                    })
                }//Post de adicionar compositor
                else if (req.url == "/compositores/add") {
                    collectRequestBodyData(req, result => {
                        axios.post('http://localhost:3000/compositores', result)
                        .then(resp => {
                            var composerId = resp.data.id;
                            var periodo = result.periodo;
                            axios.get('http://localhost:3000/periodos?nome=' + encodeURIComponent(periodo)).then(periodoResp=> {
                                if (periodoResp.data.length > 0) {
                                    res.writeHead(301, { 'Location': 'http://localhost:3001/compositores/' + composerId });
                                    res.end();
                                } else {
                                    axios.post('http://localhost:3000/periodos', { "nome": periodo })
                                    .then(periodoAddResp => {
                                        res.writeHead(301, { 'Location': 'http://localhost:3001/compositores/' + composerId });
                                        res.end();
                                    }).catch(periodoAddErr => {
                                        res.writeHead(510, { 'Content-Type': 'text/html; charset=utf-8' });
                                        res.write("<p>Não foi possível adicionar o compositor. Erro: " + periodoAddErr + "</p>");
                                        res.end();
                                    });
                                }
                            })
                            .catch(periodoErr => {
                                res.writeHead(510, { 'Content-Type': 'text/html; charset=utf-8' });
                                res.write("<p>Não foi possível adicionar o compositor. Erro: " + periodoErr + "</p>");
                                res.end();
                            });
                        })
                        .catch(composerErr => {
                           res.writeHead(510, { 'Content-Type': 'text/html; charset=utf-8' });
                            res.write("<p>Não foi possível adicionar o compositor. Erro: " + composerErr + "</p>");
                            res.end();
                        });
                    });
                }//Post de adicionar periodo
                else if (req.url == "/periodos/add") {
                    collectRequestBodyData(req, result => {
                        axios.post('http://localhost:3000/periodos', result).then(resp => {
                            res.writeHead(301, { 'Location': 'http://localhost:3001/periodos/' + resp.data.nome })
                            res.end()
                        }).catch(erro => {
                            res.writeHead(511, { 'Content-Type': 'text/html; charset=utf-8' })
                            res.write("<p>Não foi possível adicionar o período. Erro: " + erro + "</p>")
                            res.end()
                        })
                    })
                }//Caso de post erro
                else {
                    res.writeHead(512, { 'Content-Type': 'text/html; charset=utf-8' })
                    res.write("<h1>Erro: " + req.url + " POST request não suportado.</h1>")
                    res.end()
                }


                break

            default:
                // Outros metodos nao sao suportados
                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' })
                res.write("<h1>Erro: " + req.method + " não suportado.</h1>")
                res.end()
                break

        }
    }
})

server.listen(3001, () => {
    console.log("Servidor à escuta na porta 3001...")
    console.log("check http://localhost:3001")
})