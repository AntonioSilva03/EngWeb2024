import os
import re
import xml.etree.ElementTree as ET

pasta = "html" #Pasta para todos os html

if not os.path.exists(pasta):
    os.mkdir(pasta)

xmls = "./MapaRuas-materialBase/texto" #Pasta onde se encontram os xmls

#Inicialização do html do index
html = '''
<!DOCTYPE html>
<html>
<head>
    <title>EngWeb2023</title>
    <meta charset="UTF-8">
</head>
<body>
'''

template = html #Todas as ruas usam esta inicialização

html += "<h1>Ruas de Braga</h1>"
html += "<ul>" #Formação da lista
listaRuas = {}
for file in os.listdir(xmls):
    if file.endswith(".xml"):
        path = os.path.join(xmls, file)

    #Parsing do XML
    tree = ET.parse(path)
    root = tree.getroot()

    #Determinação do nome do ficheiro
    nome = root.find('./meta/nome')
    numero_find = root.find('./meta/número')
    numero_rua = numero_find.text if numero_find is not None else "Número da rua não encontrado"
    listaRuas[nome.text.lstrip()] = numero_rua
    html_file = os.path.join(pasta, f'{numero_rua}.html')
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(template)
        #Adição do style css em cada página html
        style = '''
        <style>
        .imagem{
            display: flex;
            flex-wrap: wrap;
        }
        .imagem .legenda{
            width: 50%;
            box-sizing: border-box;
            padding: 10px;
            text-align: center;
        }
        .imagem img{
            max-width: 80%;
            height: auto;
        }
        </style>
        '''
        f.write(style)
        f.write(f'<h1>{nome.text}</h1>\n')

        #DESCRIÇÃO
        paragrafos = root.findall('./corpo/para')
        for para in paragrafos:
            paragrafo = ''

            texto = para.text.strip() if para.text else ''
            paragrafo += texto

            #Tratamento de dados dependentes da tag ou não existencia dela
            for tag in para:
                if tag.tag == 'lugar':
                    lugar = tag.text if tag.text else ''
                    paragrafo += f' {lugar} '
                elif tag.tag == 'data':
                    data = tag.text if tag.text else ''
                    paragrafo += f' {data} '
                elif tag.tag == 'entidade' and tag.get('tipo') == 'instituição':
                    entidade = tag.text if tag.text else ''
                    paragrafo += f' {entidade} '
                else:
                    texto_normal = tag.text if tag.text else ''
                    paragrafo += f' {texto_normal} '
                
                if tag.tail:
                    paragrafo += tag.tail.strip()
                
            f.write(f'<p>{paragrafo}</p>\n')
        
        #MAQUETES
        imagens = []
        #Aquisição das imagens das maquetes sobre cada rua
        for imagem in root.findall('.//imagem'):
            path_imagem = imagem.get('path')
            filename, file_extension = os.path.splitext(os.path.basename(path_imagem))
            imagem_path = f"../MapaRuas-materialBase/imagem/{filename}{file_extension}"
            imagens.append(imagem_path)

        #Adição da imagem e da sua legenda
        f.write('<div class="imagem">')
        for imagem_path in imagens:
            legenda = ''
            for figura in root.findall('.//figura'):
                imagem_find = figura.find('imagem')
                if imagem_find is not None:
                    path_find = imagem_find.get('path')
                    if imagem_path.endswith(os.path.basename(path_find)):
                        legenda_find = figura.find('legenda')
                        if legenda_find is not None:
                            legenda = legenda_find.text.strip()
                            break

            f.write(f'<div class="legenda"> <img src="{imagem_path}"> <p>{legenda}</p> </div>')
        f.write('</div>\n')

        #IMAGENS ATUAIS
        imagens_atuais = []
        path_atuais = "./MapaRuas-materialBase/atual/"
        for vista_atual in os.listdir(path_atuais):
            #Expressão regular utilizada para encontrar a vista atual da rua em questão
            match = re.match(r"(\d+)-", vista_atual)
            if match:
                numero_foto = match.group(1)
                if numero_foto == numero_rua:
                    path_atual = f'{path_atuais}{vista_atual}'
                    imagens_atuais.append("." + path_atual)
        f.write('<div class="imagem">')
        i = 1 #Ter em conta que vista estamos a utilizar
        for imagem_path_atual in imagens_atuais:
            if f'{i}' in imagem_path_atual:
                legenda =  f' {nome.text} - Vista {i}'
                i = i + 1
            else:
                legenda =  f' {nome.text} - Vista Principal'
            
            f.write(f'<div class="image-with-caption"><img src="{imagem_path_atual}"><p>{legenda}</p></div>')
        f.write('</div>\n')



        #CASAS
        casas = root.findall('./corpo/lista-casas/casa')
        f.write('<h2>Casas:</h2>\n')
        f.write('<table border = "1"> <tr><th>Número da Casa</th><th>Enfiteuta</th><th>Foro</th><th>Descrição</th></tr>\n')
        for casa in casas:
            #Tratamento dos dados de cada casa
            numero_find = casa.find('número')
            numero = numero_find.text if numero_find is not None else "Sem número"

            enfiteuta_find = casa.find('enfiteuta')
            enfiteuta = enfiteuta_find.text if enfiteuta_find is not None else "Sem enfiteuta"
            if enfiteuta == None:
                enfiteuta = "Sem enfiteuta"

            foro_find = casa.find('foro')
            foro = foro_find.text if foro_find is not None else "Sem foro"
            if foro == None:
                foro = "Sem foro"

            desc_find_all = casa.findall('desc/para')
            if desc_find_all:
                desc = ''
                for desc_find in desc_find_all:
                    descricao = desc_find.text.strip() if desc_find.text else "Sem descrição"
                    desc += descricao

                    for tag in desc_find:
                        if tag.tag == 'lugar':
                            lugar = tag.text if tag.text else ''
                            desc += f' {lugar} '
                        elif tag.tag == 'data':
                            data = tag.text if tag.text else ''
                            desc += f' {data} '
                        elif tag.tag == 'entidade' and tag.get('tipo') == 'instituição':
                            entidade = tag.text if tag.text else ''
                            desc += f' {entidade} '
                        else:
                            texto_normal = tag.text if tag.text else ''
                            desc += f' {texto_normal} '

                        if tag.tail:
                            desc += tag.tail.strip()
            else:
                desc = "Sem descrição"

            f.write(f'<tr><td>{numero}</td><td>{enfiteuta}</td><td>{foro}</td><td>{desc}</td></tr>\n')
        f.write('</table>\n')

        f.write('<a href="../index.html"> Voltar ao índice </a>\n')
        f.write('</body>\n</html>')
        f.close()

sortedRuas = sorted(listaRuas.items()) #Sort das ruas

for nome, numero_rua in sortedRuas: #Adição ao index das ruas já ordenadas alfabeticamente
    html += f'<li> <a href="./html/{numero_rua}.html"> {nome} </a> </li> \n'

html += "</body>"
html += "</html>"

index = open('./index.html', 'w', encoding="utf-8")
index.write(html) #Criação do index
index.close()