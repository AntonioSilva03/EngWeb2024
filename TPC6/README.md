# TPC6: Página sobre compositores utilizando MongoDB, npm e pug
## 2024-03-26

## Autor:
- A100533
- António Filipe Castro Silva

## Resumo:

Criar uma aplicação para a gestão de uma base de dados de compositores musicais:

- Montar a API de dados com o mongoDB a partir do dataset de compositores e de períodos
- Criar uma aplicação Web utilizando npm e pug com as seguintes caraterísticas:
    - CRUD sobre compositores;
    - CRUD sobre períodos musicais.
- Investigar e inserir pelo menos 5 compositores do período moderno(3) ou serialista(2).


## Resolução:

- Grande parte deste TPC foi reutilizado do TPC anterior, por exemplo, todas as views em pug são iguais, tendo feitas somente algumas pequenas alterações, por exemplo, transformar os "id" em "_id" devido à estrutura dos ID's no MongoDB.
- A primeira grande diferença é que agora na [app.js](https://github.com/AntonioSilva03/EngWeb2024/tree/main/TPC6/appCompositores/app.js) começamos por efetuar a conexão ao mongoDB utilizando a biblioteca mongoose do javascript
- Tal como no TPC5, temos novamente 3 routes: compositores, index e periodos. Acontece que desta vez em vez de se utilizar o axios vai-se utilizar funções criadas na pasta [controllers](https://github.com/AntonioSilva03/EngWeb2024/tree/main/TPC6/appCompositores/controllers). De resto, continua-se a utilizar o express para executar os GET's ou POST's necessários, tendo também os status normais e os de erros, para ver que problemas aconteciam durante a formulação da solução.
- A pasta controllers tem dois ficheiros: [compositor.js](https://github.com/AntonioSilva03/EngWeb2024/tree/main/TPC6/appCompositores/controllers/compositor.js) e [periodo.js](https://github.com/AntonioSilva03/EngWeb2024/tree/main/TPC6/appCompositores/controllers/periodo.js). Esses ficheiros são responsáveis por criarem as funções básicas de listagem, procura, criação e eliminação que tratam dos dados no MongoDB.
- Este controllers utilizam os modelos do compositor e do periodo que foram criados na pasta [models](https://github.com/AntonioSilva03/EngWeb2024/tree/main/TPC6/appCompositores/models). São estes modelos que definem a Schema de cada compositor/período e dão export como um model de mongoose.


## Como correr:

- Para correr este programa começa-se por abrir o MongoDBCompass, criar uma Base de Dados chamada EW na porta 27017 e dentro dessa Base de Dados cria-se duas Collections: compositores e periodos. Nessas collections coloca-se os datasets [compositores.json](https://github.com/AntonioSilva03/EngWeb2024/tree/main/TPC6/compositores.json) e [periodos.json](https://github.com/AntonioSilva03/EngWeb2024/tree/main/TPC6/periodos.json), respetivamente.

- Depois de termos criado essas collections, podemos dar `npm start` na pasta appCompositores para correr o programa e podemos ver a página web como sempre no link: `http://localhost:3001/`
