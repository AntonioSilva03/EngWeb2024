# TPC4: Página sobre compositores com json-server, modificação do json original e CRUD, mas desta vez utilizando npm e pug
## 2024-03-19

## Autor:
- A100533
- António Filipe Castro Silva

## Resumo:

Criar uma aplicação para a gestão de uma base de dados de compositores musicais:

- Montar a API de dados com o json-server a partir do dataset de compositores em anexo;
- Criar uma aplicação Web utilizando npm e pug com as seguintes caraterísticas:
    - CRUD sobre compositores;
    - CRUD sobre periodos musicais.
- Investigar e inserir pelo menos 5 compositores do período moderno(3) ou serialista(2).

## Resolução:

- Fazer correção no www para alterar para a porta 3001 que tenho utilizado e fazer pequenas alterações em certas funções. Além disso, colocar nas stylesheets o w3.css que temos utilizado.

- Depois dessas alterações, adicionar ao `app.js` as routes que iriamos criar

- As routes em questão são a: compositores.js (onde tratamos de todos os GET e POST sobre compositores), index.js (onde tratamos da página inicial) e periodos.js (onde tratamos de todos os GET e POST sobre períodos)

- Por fim, criamos todas as views que iriamos necessitar em pug, que foi basicamente traduzir as templates criadas no TPC anterior para os ficheiros pug

## Como correr:

Primeiro inicializa-se o db.json com json-server e posteriormente corre-se o server com o código `npm start`