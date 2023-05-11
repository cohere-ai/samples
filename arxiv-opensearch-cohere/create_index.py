import json

import opensearch_py_ml as oml
import pandas as pd
from config import DATA_PATH, VECTOR_NAME, VECTOR_SIZE, client
from tqdm import tqdm

INDEX_NAME = "arxiv-l2"

# create index payload
body = {
    "settings": {"index": {"knn": "true", "knn.algo_param.ef_search": 100}},
    "mappings": {
        "properties": {
            VECTOR_NAME: {
                "type": "knn_vector",
                "dimension": VECTOR_SIZE,
                "method": {
                    "name": "hnsw",
                    "space_type": "l2",
                    "engine": "nmslib",
                    "parameters": {"ef_construction": 128, "m": 24},
                },
            },
        }
    },
}


print(f"Creating index={INDEX_NAME}")
response = client.indices.create(INDEX_NAME, body=body)
print(response)

# read in datafile to get in the fields to add to the index
df = pd.read_csv(DATA_PATH).fillna("").reset_index(drop=True)

# open cache of embedding vectors
with open("cache.jsonl", "r") as fp:
    cache = json.load(fp)

# insert each row one-at-a-time to the document index
for i, row in tqdm(df.iterrows()):
    text = row.abstract
    try:
        embed = cache[text]
        body = {
            VECTOR_NAME: embed,
            "text": text,
            "title": row.title,
            "arxiv_id": row.id,
            "doi": row.doi,
        }
        response = client.index(index=INDEX_NAME, id=i, body=body)
    except Exception as e:
        print(f"[ERROR]: {e}")
        continue

# sanity check inserted records
oml_df = oml.DataFrame(client, INDEX_NAME)
print(f"Shape of records inserted into index {INDEX_NAME} = {oml_df.shape}")
