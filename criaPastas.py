import os


for i in range(2,9):

    nomePasta = f"TPC{i}"

    os.mkdir(nomePasta)

    open(f"{nomePasta}/.gitkeep", "w")

    open(f"{nomePasta}/README.md", "w")

nomePasta = "Projeto"

os.mkdir(nomePasta)

open(f"{nomePasta}/.gitkeep", "w")

open(f"{nomePasta}/README.md", "w")

nomePasta = "Teste"

os.mkdir(nomePasta)

open(f"{nomePasta}/.gitkeep", "w")

open(f"{nomePasta}/README.md", "w")