import sys
import json

def fix_json(data):
    lines = data.strip().split('\n')

    fixed_data = []
    actors_set = set()
    genres_set = set()

    for line in lines:
        try:
            entry = json.loads(line)

            if 'genres' in entry:
                genres_set.update(genre for genre in entry['genres'] if genre)

            if 'cast' in entry:
                actors_set.update(actor for actor in entry['cast'] if actor)

            if entry.get('cast') and entry.get('genres'):
                fixed_data.append(entry)

        except json.JSONDecodeError as e:
            print(f"Error decoding JSON: {e}. \n Skipping line: {line}")
    
    actors = [{"nome": actor} for actor in actors_set]
    genres = [{"nome": genre} for genre in genres_set]

    return fixed_data, actors, genres


def main(argv):
    path = argv[1]

    with open(path, 'r', encoding='utf-8') as file:
        lines = file.readlines()
        fixed_json, actors, genres = fix_json(''.join(lines))

    fixed_db = {
        "filmes" : fixed_json,
        "atores" : actors,
        "generos" : genres
    }

    with open("fixed_db.json", 'w', encoding='utf-8') as file:
        json.dump(fixed_db, file, indent= 2)

if __name__ == "__main__":
    main(sys.argv)       
