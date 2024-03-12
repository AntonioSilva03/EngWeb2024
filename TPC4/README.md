# TPC4: Página sobre compositores com json-server, modificação do json original e CRUD
## 2024-03-12

## Autor:
- A100533
- António Filipe Castro Silva

## Resumo:

Criar uma aplicação para a gestão de uma base de dados de compositores musicais:

- Montar a API de dados com o json-server a partir do dataset de compositores em anexo;
- Criar uma aplicação Web com as seguintes caraterísticas:
    - CRUD sobre compositores;
    - CRUD sobre periodos musicais.
- Investigar e inserir pelo menos 5 compositores do período moderno(3) ou serialista(2).

## Resolução:

Comecei por novamente tratar do json utilizando um script de python, este trata de 3 casos:
1. vê se o compositor tem todos os parâmetros precisos
2. vai verificando se existem períodos novos para acrescentar à nova lista de períodos
3. se o nome de uma pessoa tiver a vírgula no meio, organiza-o para ficar direito. Exemplo: ultimo, primeiro -> primeiro ultimo

Depois de corrigido o dataset foram criados os 3 ficheiros javascript que seriam usados neste trabalho:
1. Static: serve para tratar da stylesheet w3
2. Templates: onde desenhei todas as templates em HTML que o programa podia utilizar
3. Server: o servidor em si que tem todos os casos de GET e POST que o servidor pode correr

## Como correr:

Primeiro inicializa-se o db.json com json-server depois de este ser corrigido e posteriormente corre-se o server com o código `node server.js`

