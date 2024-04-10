import json
import requests

datasets_extra = ["datasets/dataset-extra1.json",
                  "datasets/dataset-extra2.json",
                  "datasets/dataset-extra3.json"]

api_url = "http://localhost:3001/pessoas"

for dataset in datasets_extra:
    with open(dataset, 'r', encoding='utf-8') as file:
        data = json.load(file)['pessoas']

        for pessoa in data:
            resposta = requests.post(api_url, json=pessoa)
            print(f"POST {pessoa['nome']}, Response: {resposta.status_code}")         