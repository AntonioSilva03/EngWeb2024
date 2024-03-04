# TPC2: Página de uma escola de música com json-server
## 2024-03-05

## Autor:
- A100533
- António Filipe Castro Silva

## Resumo:

Para este TPC, utilizou-se um dataset em JSON sobre filmes americanos que teve de levar com um processamento para corrigi-lo e dividi-lo em filmes, atores e géneros.

De seguida, este dataset corrigido foi utilizado a par com o json-server para produzir um website que apresenta uma página inicial a mencionar as 3 listas existentes(filmes, atores e géneros). A lista dos filmes, tem os filmes ordenados por ano, a dos atores e dos géneros por ordem alfabética. Cada um deles tem a sua página individual: filme contêm o ano, elenco e género, ator contem os seus filmes e a página de cada género também.

## Resolução:

Para resolver este TPC, a sua resolução foi dividida em 3 partes principais:

- Corrigir o dataset de forma a que só existam filmes que tenham ator(es) e género(s) e criando uma secção individual para os atores e para os géneros, além de para os filmes

- No ficheiro [servidor.js](https://github.com/AntonioSilva03/EngWeb2024/tree/main/TPC3/servidor.js) iremos tratar das funções que irão gerar as páginas que vamos utilizar, utilizando também o ficheiro [w3.css](https://github.com/AntonioSilva03/EngWeb2024/tree/main/TPC3/w3.css) para formatá-las. Criamos os índices de cada lista e a página individual de cada um. A página inicial foi feita à mão estando esta no ficheiro [web.html](https://github.com/AntonioSilva03/EngWeb2024/tree/main/TPC3/web.html)

- Depois criamos o servidor que abre essas páginas, utilizando o url para saber o que pedir às funções criadas anteriormente. Dependendo do pedido executado abrimos uma certa página.

## Como correr:

- Primeiramente tive de correr o [corretor_json.py](https://github.com/AntonioSilva03/EngWeb2024/tree/main/TPC3/corretor_json.py) para corrigir o dataset: `python corretor_json.py db.json` que cria o novo [dataset](https://github.com/AntonioSilva03/EngWeb2024/tree/main/TPC3/fixed_db.json)

- Depois basta correr o json-server com esse dataset: `json-server --watch fixed_db.json`, que fica na porta 3000

- Por fim corre-se `node servidor.js` para realmente corrermos o servidor que depois entrando no url `http://localhost:3001/` vai nos demonstrar a nossa página inicial de onde podemos ir a qualquer informação fornecida por este servidor.

