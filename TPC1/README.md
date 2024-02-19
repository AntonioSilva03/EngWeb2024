# TPC1: Mapa das Ruas de Braga
## 2024-02-20

## Autor:
- A100533
- António Filipe Castro Silva

## Resumo

Para este TPC, utilizou-se o dataset com imagens(fotos atuais das ruas com uma determinada vista e fotos de maquetas antigas das mesmas ruas) e ficheiros XML com informações sobre  60 ruas de Braga fornecido pelo docente.

Este dataset foi utilizado para produzir um website que apresenta uma página inicial com um índice das ruas ordenada alfabeticamente. Ao clicarmos numa das ruas, acede-se à página individual da rua onde podemos consultar toda a informação sobre esta. Em cada página também haverá um link para voltar ao índice inicial.

## Resolução

Para resolver este TPC, dividi a resolução em 7 partes:

1. Comecei por indicar a pasta onde iria guardar todos os html, onde se encontravam os xml e inicializei o html que iria ser usado no index e como template para todas as ruas
2. Depois tratei do parsing dos ficheiros xml, da determinação do nome de cada ficheiro html (o número da rua) e de abrir esse ficheiro e colocar o style que seria utilizado em cada um deles
3. No ínicio das informações, fiz o tratamento dos dados existentes na descrição, de acordo com serem texto, um lugar, uma data ou uma entidade.
4. De seguida a ter tratado da descrição, comecei a pesquisar todas as imagens de maquetes que poria no html, pondo cada uma delas dentro duma div de imagem e com outra div legenda que trataria de ter a legenda debaixo de cada foto
5. Após tratar das fotos das maquetes, tratei das fotos das imagens atuais que necessitaram de um tratamento especial, pois não tem nos xml o nome dessas fotos. Para tal utilizei uma expressão regular para pesquisar cada foto e dependendo de estas terem o número da Vista ou não, teriam uma legenda diferente
6. Para terminar o tratamento dos dados, criei uma tabela que seria utilizada para guardar as informações sobre as casas. Estas têm quatro colunas: número, enfiteuta, foro e descrição. Dependendo da existência ou não destes, aparece o texto ou uma mensagem de, por exemplo, "Sem enfiteuta".
7. Por fim, criei um botão para voltar ao índice, dei sort às ruas por ordem alfabética e coloquei cada uma por essa ordem no index. Depois criei o ficheiro de index, escrevi o seu texto lá e fechei esse ficheiro, terminando assim este TPC.