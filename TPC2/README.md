# TPC2: Página de uma escola de música com json-server
## 2024-02-27

## Autor:
- A100533
- António Filipe Castro Silva

## Resumo

Para este TPC, utilizou-se um dataset em JSON de uma escola de música que continha vários alunos, cursos e instrumentos.

Este dataset foi utilizado a par com o json-server para produzir um website que apresenta uma página inicial a mencionar as 3 listas existentes(alunos, cursos e instrumentos). Dentro de cada lista, tem todos os alunos, cursos e instrumentos ordenados e cada aluno, curso e instrumento tem a sua página individual detalhada que pode levar a outras páginas dependendo do tipo de informação que o utilizador quer averiguar.

## Resolução

Para resolver este TPC, a sua resolução foi dividida em 4 partes principais:

1. Carregar todas as dependências necessárias, criar o servidor e sempre que for feito um pedido demonstrar no log para se ver que está a funcionar. Inicializar as páginas e criar a página inicial contendo todas as listas com referências onde teremos o conteúdo delas.

2. Tratamento da lista de alunos, indo buscar ao json-server a partir do axios e pedindo já de antemão a lista ordenada, tendo de seguida de tratar de colocar no ecrã cada aluno e um botão de retorno à página inicial. Cada aluno tem uma referência para a sua página, onde terá todo o seu conteúdo, tendo o curso e o instrumento uma hiperligação para a sua própria página e outro botão de retorno, desta vez para a lista de alunos.

3. Do mesmo modo que tratamos da lista de alunos, seguidamente faz-se o tratamento da lista dos cursos do exato mesmo modo, enquanto que nos alunos se ordenava pelo nome, desta vez no axios pede-se para ordenar por designação e novamente cada curso tem uma referência para a sua própria página. Na página do seu curso, tem todo o seu conteúdo e uma hiperligação para a página do instrumento usado nesse curso. Tal como nos alunos, existem 2 botões de retorno, sendo um para a página inicial e outro para a lista de instrumentos

4. Por fim, fez-se o tratamento da lista de instrumentos, que tem um caso especial na ordenação pois têm-se de utilizar %23 para simbolizar o # senão dá problema. A lista funciona do mesmo modo, tendo uma ligação para a página de cada instrumento e cada instrumento tem os seus dados e existem dois botões de retorno novamente(página inicial, lista de instrumentos). Para concluir o programa, trata-se do caso de operações não suportadas e indica-se a porta em que o servidor vai ficar à escuta.

## Para correr:

- Primeiramente tem-se que fazer `json-server --watch db.json` para correr o json-server com o nosso dataset, sendo que por *default* este fica na porta 3000.

- Seguidamente fazemos `node servidor.js` para realmente corrermos o servidor que depois entrando no url `http://localhost:3001/` vai nos demonstrar a nossa página inicial de onde podemos ir a qualquer informação fornecida por este servidor.