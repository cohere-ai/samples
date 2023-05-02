# Cohere / Opensearch implementation

The following steps outline how a user would perform vector search with Cohere and Opensearch. Starting with spinning up a local OpenSearch instance and how a user would store Cohere embeddings in an OpenSearch index, and then explaining the methods for retrieval using these embeddings.
Note, these instructions are based on OpenSearch v2.5.0.

## Step 1: Spin up an instance of OpenSearch

Run `docker-compose up` to spin up the Opensearch instance running at `http://localhost:9200`

To make sure your server is running you can run `curl localhost:9200` and you should see a similar output:

```
{
  "name" : "c77963d46f00",
  "cluster_name" : "docker-cluster",
  "cluster_uuid" : "Qn6HcFspROKuaMlmKbYoQQ",
  "version" : {
    "distribution" : "opensearch",
    "number" : "2.5.0",
    "build_type" : "tar",
    "build_hash" : "b8a8b6c4d7fc7a7e32eb2cb68ecad8057a4636ad",
    "build_date" : "2023-01-18T23:49:00.584806002Z",
    "build_snapshot" : false,
    "lucene_version" : "9.4.2",
    "minimum_wire_compatibility_version" : "7.10.0",
    "minimum_index_compatibility_version" : "7.0.0"
  },
  "tagline" : "The OpenSearch Project: https://opensearch.org/"
}
```


## Step 2: Embed your documents 
We will be utilizing Cohere's `embed` endpoint to embed documents into vectors. For demo purposes, we will be using the Cohere `small` model which will output vectors with 1024 floating point elements. 

To follow along, download the [arxiv dataset](https://www.kaggle.com/datasets/Cornell-University/arxiv). We subset it to 5000 rows for example purposes and saved it to a local `/data` folder. 

You'll need to create an account at [cohere.ai](https://dashboard.cohere.ai/) and grab your free trial `API_KEY`. 

Use our Python package [cohere](https://pypi.org/project/cohere/) to create a client to interact with our embed endpoint. You can then instantiate a client like so:
```python
import cohere
co = cohere.Client(<YOUR_API_KEY>)
```

Read in your local data file and create a list of texts to send to the embed endpoint. In this example, we will create embeddings using the `abstract` column.  
```python
import pandas as pd

df = pd.read_csv(<PATH_TO_DATASET>).fillna("").reset_index(drop=True)

texts = []
for text in df["abstract"].values.tolist():
    texts.append(text[0])
```

Once you have a list of texts to embed, hit the `embed` endpoint using the following helper function:
```python
import numpy as np 

def get_cohere_embedding(text: Union[str, List[str]]) -> List[float]:
    """
    Embed a single text with cohere client and return list of float32
    """
    if type(text) == str:
        embed = np.array(co.embed([text], model=COHERE_MODEL).embeddings)
        return list(embed.reshape(-1))
    else:
        embed = np.array(co.embed(text, model=COHERE_MODEL).embeddings)
        return [x.tolist() for x in embed]

embed_list = get_cohere_embedding(texts)
```

To save time and cost, dump out the embedding vectors as a `.jsonl` file to be used in the next step. 

```python
cache = dict(zip(texts, embed_list))

with open("cache.jsonl", "w") as fp:
    json.dump(cache, fp)
```

You have successfully embedded your corpus! 

The full script can be run with `python cache_vectors.py`. 

## Step 3: Create an index for your documents
We need to create an index to store our documents and their dense vectors to allow OpenSearch to do vector search. 

The [k-NN plugin](https://opensearch.org/docs/2.5/search-plugins/knn/index/) in OpenSearch contains 3 methods we can use to search our corpus using vectors. They include: 
1. Approximate k-NN
2. Script Score 
3. Painless extensions

For this demo, we will run [Approximate k-NN](https://opensearch.org/docs/2.5/search-plugins/knn/approximate-knn/). This method will reduce the dimensionality of vectors to be searched and then reindex the document index. Similar documents will be computed as the distance between the query vector and potential hits. It is recommeded to use this approach when the dimensionality of the vector space is large. 

To get started with Approximate k-NN, we need to create an index in OpenSearch with the `index.knn` parameter set to true. 

Additionally, we need to set configurations for the kNN search. See docs [here](https://opensearch.org/docs/2.5/search-plugins/knn/knn-index#method-definitions) for guidance on setting the right parameters. This parameters include:   
* `dimension` = dimensionality of the embedding vector. For us, since we are using the Cohere `small` model, it is 1024. 
* `method.name` = supported algorithm to perform the kNN search. `hnsw` is currently supported with an engine type of `nmslib`
* `method.space_type` = corresponds to function used to measure distance between two vectors. In this example, we set `space_type='l2'` to denote the L2 distance. There are a variety of other `space_types` you may want to select depending on your use-case. You can find these [here](https://opensearch.org/docs/2.5/search-plugins/knn/approximate-knn/#spaces).
* `method.engine` = the library to use for indexing/search. When using a CPU, `nmslib` is the recommended engine option

When selecting `hnsw` as the `method.name`, we have additional parameters for the `hnsw` algorithm such as `ef_construction` and `m`. See docs [here](https://opensearch.org/docs/2.5/search-plugins/knn/index/) for guidance on setting the right parameters.



We are using the Python [opensearch-py](https://pypi.org/project/opensearch-py/) package to communicate with the OpenSearch cluster in the backend. For demo purposes, we are turning off SSL verification since it is a simple, local cluster. 
Create a client like so: 
```python
from opensearchpy import OpenSearch

def get_opensearch_client(host="localhost", port=9200) -> OpenSearch:
    # Create the client with SSL/TLS and hostname verification disabled.
    client = OpenSearch(
        hosts=[{"host": host, "port": port}],
        http_compress=True,  # enables gzip compression for request bodies
        use_ssl=False,
        verify_certs=False,
        ssl_assert_hostname=False,
        ssl_show_warn=False,
    )
    return client

client = get_opensearch_client()
```

Create an index by first creating the `body` payload and then submitting that to the index endpoint. The `body` payload specifies the name of your vectors, the size and various Approximate k-NN parameters discussed above. In this example, our document index will be called `arxiv-l2`. 

```python
INDEX_NAME = "arxiv-l2"

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
response = client.indices.create(INDEX_NAME, body=body)
```
You can sanity check your index has been created by running the following line to get all indices currently populated in your OpenSearch backend. 
```python
print(client.indices.get_alias("*").keys())
```

Now that the index is created, we need to populate it with data. We are going to use the `cache.jsonl` we created in the previous step and the dataset file to populate the index with documents and their corresponding embedding vectors: 
```python
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
```
We have included the `abstract`, `title`, `arxiv_id` and `doi` fields in the document index from the data file. Feel free to include more or less depending on what you think you would want to search for. 

Using the [opensearch-py-ml](https://pypi.org/project/opensearch-py-ml/) package, we are able to query our OpenSearch cluster with a pandas-like interface. You can run the following to ensure the documents inserted at your `index_name` are what you expect in terms of size. 

**Note:** when using `opensearch-py-ml` package, ensure you look through the [documentation](https://opensearch-project.github.io/opensearch-py-ml/reference/index.html) as you cannot do every command as you would in pandas. 

```python
oml_df = oml.DataFrame(client, INDEX_NAME)
print(oml_df.shape)
```

Your index has been created! 

Full script can be run with `python create_index.py`. 

## Step 4: Query your index for similar documents using cohere embeddings

Now that your index is populated, you can proceed to querying it!
Since we are using vectors for the kNN search, any of our queries must be translated to a vector using Cohere. The query vector is then submitted to the query endpoint within OpenSearch to find similar vectors via Approximate k-NN. 

We can do so with the following helper functions: 
```python

def get_cohere_embedding(text: str) -> List[float]:
    """
    Embed a single text with cohere client and return list of float32
    """
    embed = np.array(co.embed([text], model=COHERE_MODEL).embeddings)
    return list(embed.reshape(-1))


def find_similar_docs(query: str, k: int, num_results: int, index_name: str) -> Dict:
    """
    Main vector search capability using knn on input query strings.
    Args:
        k: number of k-similar neighbors/vectors to retrieve from opensearch index
        num_results: number of the k-similar vectors to retrieve.
        index_name: index name in opensearch
    """
    embed_vector = get_cohere_embedding(query)

    body = {
        "size": num_results,
        "query": {"knn": {VECTOR_NAME: {"vector": embed_vector, "k": k}}},
    }

    url = f"http://localhost:9200/{index_name}/_search"
    response = requests.get(
        url, json=body, headers={"Content-Type": "application/json"}
    )
    return json.loads(response.content)
```

The above functions search our index using 2 important parameters: 
* `k` = the number of neighbors the `hnsw` search will return per query. The maximum `k` supported is 10,000. 
* `size` = how many results will be returned from the query

```python
search_output = find_similar_docs(query=query, k=2, num_results=3, index_name=INDEX_NAME) 
print(search_output)
```

You are now able to search your index semantically! A full demo of the semantic search functionality versus the lexical search built into OpenSearch can be viewed at in this [notebook](demo.ipynb). 

## TL,DR: 

* Run `python cache_vectors.py` to create your embeddings 
* Run `python create_index.py` to create an L2 based index 
* Optionally, run `python create_cosine_index.py` to create a cosine based index
* Run `demo.ipynb` to visualize the results
* If you'd like to run the streamlit demo, run `streamlit run demoapp.py --browser.gatherUsageStats=False --server.port=8080 --server.address=0.0.0.0` and your app will be available at `http://localhost:8080`

## References 
* Opensearch knn [docs](https://opensearch.org/docs/2.5/search-plugins/knn/knn-index/)
* opensearch-py [guide](https://github.com/opensearch-project/opensearch-py/blob/main/guides/search.md)
* opensearch-py-ml [docs](https://opensearch-project.github.io/opensearch-py-ml/reference/api/DataFrame.html)