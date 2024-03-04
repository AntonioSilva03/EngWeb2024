var http = require('http');
var url = require('url');
var axios = require('axios');
var fs = require('fs');

// Função que gera o índice de filmes
function genIndexFilmes(data) {
    html = `
    <html>
        <head>
            <title>Lista de Filmes</title>
            <meta charset="utf-8"/>
            <link rel="stylesheet" href="w3.css">
        </head>
        <body>
            <div class="w3-container w3-teal">
                <h1>Lista de Filmes</h1>
            </div>
            <table class="w3-table w3-bordered">
                <tr>
                    <th>Ano</th>
                    <th>Título</th>
                </tr>
    `
    data.forEach(filme => {
        html += `
        <tr>
            <td>${filme.year}</td>
            <td><a href="/filmes/${filme._id.$oid}">${filme.title}</a></td>
        </tr>
        `
    })

    html += `
    </table>
    <h3><a href='/'> Voltar à pagina inicial </a> </h3>
    </body>
    </html>
    `

    return html
}

// Função que gera a página de um filme em específico
function genPagFilme(data) {
    html = `
    <html>
        <head>
            <title>Filme</title>
            <meta charset="utf-8"/>
            <link rel="stylesheet" href="/w3.css">
        </head>
        <body>
            <div class="w3-center w3-container w3-teal">
                <h1>Filme: ${data[0]['title']}</h1>
            </div>
            <div class="w3-container">
                <p><b>Ano:</b> ${data[0]['year']}</p>
                <p><b>Elenco:</b></p>
                <ol>
    `
    for (actor in data[0]['cast']) {
        html += "<li><a href='/atores/" + data[0]['cast'][actor] + "'>" + data[0]['cast'][actor] + "</a></li>"
    }

    if (data[0]['genres'].length > 1) {
        html += `
            </ol>
            <br>
            <p><b>Géneros:</b></p>
            <ol>
        `
        for (genre in data[0]['genres']) {
            html += "<li><a href='/generos/" + data[0]['genres'][genre] + "'>" + data[0]['genres'][genre] + "</a></li>"
        }
        html += "</ol>"
    } else {
        html += `
            </ol>
            <br>
            <b>Género:</b>
            <ul>
        `
        for (genre in data[0]['genres']) {
            html += "<li><a href='/generos/" + data[0]['genres'][genre] + "'>" + data[0]['genres'][genre] + "</a></li>"
        }
        html += "</ul>"
    }

    html += `
        </div>
        <h4><a href='/filmes'> Voltar à lista de filmes </a> </h4>
        </body>
        </html>
    `

    return html
}

// Função que cria o índice de atores por ordem alfabética
function genIndexAtores(data) {

    data.sort((a, b) => a.nome.localeCompare(b.nome));

    html = `
    <html>
        <head>
            <title>Lista de Atores</title>
            <meta charset="utf-8"/>
            <link rel="stylesheet" href="w3.css">
        </head>
        <body>
            <div class="w3-container w3-teal">
                <h1>Lista de Atores</h1>
            </div>
            <table class="w3-table w3-bordered">
                <tr>
                    <th>Nome</th>
                </tr>
    `
    data.forEach(actor => {
        html += `
        <tr>
            <td><a href="/atores/${actor.nome}">${actor.nome}</a></td>
        </tr>
        `
    })

    html += `
    </table>
    <h3><a href='/'> Voltar à pagina inicial </a> </h3>
    </body>
    </html>
    `

    return html
}

// Função que gera a página de um ator em específico
function genPagAtor(ator, data) {
    html = `
    <html>
        <head>
            <title>Ator</title>
            <meta charset="utf-8"/>
            <link rel="stylesheet" href="/w3.css">
        </head>
        <body>
            <h1 class="w3-container w3-teal w3-center">${ator}</h1>
            <div class="w3-container">
                <p><b>Filme:</b></p>
                <ol>
    `

    for (filme in data) {
        html += `<li><a href="/filmes/${data[filme]._id.$oid}">${data[filme].title},${data[filme].year}</a></li>`
    }

    html += `
    </ol>
    </div>
    <h4><a href='/atores'> Voltar à lista de atores </a> </h4>
    </body>
    </html>
    `

    return html
}

//Função que gera o índice de géneros
function genIndexGeneros(data) {
    data.sort((a, b) => a.nome.localeCompare(b.nome));
    html = `
    <html>
    <head>
        <title>Lista de Géneros</title>
        <meta charset="utf-8"/>
        <link rel="stylesheet" href="w3.css">
    </head>
    <body>
        <div class="w3-container w3-teal">
            <h1>Lista de Géneros</h1>
        </div>
        <table class="w3-table w3-bordered">
            <tr>
                <th>Género</th>
            </tr>
    `

    data.forEach(genre => {
        html += `
        <tr>
            <td><a href='/generos/${genre.nome}'>${genre.nome}</a></td>
        </tr>
        `
    })

    html += `
    </table>
    <h3><a href='/'> Voltar à pagina inicial </a> </h3>
    </body>
    </html>
    `

    return html
}

//Função que gera a página de um género em específico
function genPagGenero(genero, data) {
    html = `
    <html>
        <head>
            <title>Género</title>
            <meta charset="utf-8"/>
            <link rel="stylesheet" href="/w3.css">
        </head>
        <body>
            <div class="w3-center w3-container w3-teal">
                <h1>${genero}</h1>
            </div>
            <div class="w3-container">
                <h3>Filmes:</h3>
                <ol>
    `

    for (filme in data) {
        html += `<li><a href="/filmes/${data[filme]._id.$oid}">${data[filme].title},${data[filme].year}</a></li>`
    }

    html += `
    </ol>
    </div>
    <h4><a href='/generos'> Voltar à lista de géneros </a> </h4>
    </body>
    </html>
    `

    return html
}

// Criação do servidor
http.createServer((req, res) => {
    console.log(req.method + " " + req.url);

    var q = url.parse(req.url, true);

    //Página inicial
    if (req.url == '/') {
        fs.readFile("web.html", (erro, data) => {
            res.writeHead(200, { 'Content-Type': 'text/html; charset= utf-8' });
            res.write(data)
            res.end()
        })
    }//Lista dos filmes
    else if (req.url == "/filmes") {
        axios.get("http://localhost:3000/filmes").then(resp => {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.write(genIndexFilmes(resp.data));
            res.end();
        }).catch(erro => {
            res.writeHead(500, { 'Content-Type': 'text/html; charset= utf-8' })
            res.write("<p> Ocorreu um erro: " + erro + "</p>")
            res.end()
        })

    }// Página de um filme específico
    else if (q.pathname.match(/\/filmes\/\w+/)) {
        var filme = q.pathname.substring(8)
        axios.get("http://localhost:3000/filmes?_id.$oid=" + filme).then(resp => {
            res.write(genPagFilme(resp.data))
            res.end()
        }).catch(erro => {
            res.writeHead(500, { 'Content-Type': 'text/html; charset= utf-8' })
            res.write("<p> Ocorreu um erro: " + erro + "</p>")
            res.end()
        })

    }//Lista dos atores
    else if (req.url == "/atores") {
        axios.get("http://localhost:3000/atores").then(resp => {
            res.write(genIndexAtores(resp.data))
            res.end()
        }).catch(erro => {
            res.writeHead(500, { 'Content-Type': 'text/html; charset= utf-8' })
            res.write("<p> Ocorreu um erro: " + erro + "</p>")
            res.end()
        })
    }// Página de um ator específico
    else if (q.pathname.match(/\/atores\/\w+([\'|\`\w]+)?/)) {
        var ator = q.pathname.substring(8)
        var nome = ator.replace(/%20/g, " ")
        axios.get("http://localhost:3000/filmes").then(resp => {
            var filmes_ator = resp.data.filter(filme => filme.cast.includes(nome))
            res.write(genPagAtor(nome, filmes_ator))
            res.end()
        }).catch(erro => {
            res.writeHead(500, { 'Content-Type': 'text/html; charset= utf-8' })
            res.write("<p> Ocorreu um erro: " + erro + "</p>")
            res.end()
        })

    }//Lista dos generos
    else if (req.url == "/generos") {
        axios.get("http://localhost:3000/generos").then(resp => {
            res.write(genIndexGeneros(resp.data))
            res.end()
        }).catch(erro => {
            res.writeHead(500, { 'Content-Type': 'text/html; charset= utf-8' })
            res.write("<p> Ocorreu um erro: " + erro + "</p>")
            res.end()
        })

    }// Página de um genero específico
    else if (q.pathname.match(/\/generos\/(\w+)/)) {
        var genero = q.pathname.substring(9)
        var nome = genero.replace(/%20/g, " ")
        axios.get("http://localhost:3000/filmes").then(resp => {
            var filmes_genero = resp.data.filter(filme => filme.genres.includes(nome))
            res.write(genPagGenero(nome, filmes_genero))
            res.end()
        }).catch(erro => {
            res.writeHead(500, { 'Content-Type': 'text/html; charset= utf-8' })
            res.write("<p> Ocorreu um erro: " + erro + "</p>")
            res.end()
        })
    }// Utilização da formatacão w3
    else if (req.url == "/w3.css") {
        fs.readFile("w3.css", (erro, data) => {
            res.writeHead(200, { "Content-Type": "text/css; charset=utf-8" })
            res.write(data)
            res.end()
        })
    }//Caso de erro
    else {
        res.writeHead(400, { 'Content-Type': 'text/html; charset= utf-8' });
        res.write("<p>Erro: Pedido não suportado</p>");
        res.write("<pre>" + req.url + "</pre>");
        res.end();
    }

}).listen(3001)

console.log("Servidor à escuta na porta 3001")