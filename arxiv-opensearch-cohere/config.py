import os

import cohere
from dotenv import load_dotenv
from opensearchpy import OpenSearch

load_dotenv(".env")

COHERE_API_KEY = os.environ["COHERE_API_KEY"]
COHERE_MODEL = "small"
VECTOR_NAME = f"cohere_{COHERE_MODEL}_vector"
VECTOR_SIZE = 1024
DATA_PATH = "data/arxiv_5000.csv"
DATA_COLUMNS = ["title", "abstract"]
EMBED_COLUMN = ["abstract"]


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


def get_cohere_client(api_key):
    return cohere.Client(api_key)


co = get_cohere_client(COHERE_API_KEY)
client = get_opensearch_client(host=os.getenv("OPENSEARCH_HOST", "localhost"))
