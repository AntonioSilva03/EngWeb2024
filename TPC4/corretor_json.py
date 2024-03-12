import sys
import json

def fix_json(data):
    periodos_set = set()
    fixed_compositores = []

    for compositor in data["compositores"]:
        if all(key in compositor for key in ["id", "nome", "bio", "dataNasc", "dataObito", "periodo"]) \
                and len(compositor) == 6:
            if "periodo" in compositor and compositor["periodo"] != "":
                periodos_set.add(compositor["periodo"])
                if "," in compositor["nome"]:
                    last_name, first_name = compositor["nome"].split(", ")
                    compositor["nome"] = f"{first_name} {last_name}"
                fixed_compositores.append(compositor)

    
    periodos_set = [{"nome": periodo} for periodo in periodos_set]

    return periodos_set, fixed_compositores

def main(argv):
    with open(argv, "r", encoding="utf-8") as file:
        data = json.load(file)

    periodos, fixed_compositores = fix_json(data)

    db = data
    db["compositores"] = fixed_compositores
    db["periodos"] = periodos

    with open("db.json", "w", encoding="utf-8") as file:
        json.dump(db, file, indent=2)

if __name__ == "__main__":
    main(sys.argv[1])