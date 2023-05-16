# search-demos

## Re-ranking Wikipedia Search API Results

This demo uses the co.rerank() endpoint to improve search results of existing public APIs.

Live: [search-demos.vercel.app](https://search-demos.vercel.app)

## Setup

```shell
# Start fastApi server with:
cd re_rank_demo
uvicorn main:app --reload

# In main.py: replace the 'x' with your Cohere API key
os.environ["COHERE_KEY"] = "x"
```

## Development

```shell
# Run tailwindcss server with:
npx tailwindcss -i ./ui/input.css -o ./ui/output.css --watch
```

## Logs

```shell
# To access your logs locally, create two files within re_rank_demo:
re-rank-request-log.jsonl
feedback-log.jsonl
```

Alternatively, you can create your logs on Segment.
You can find the documentation to setup Segment [here](https://segment.com/docs/connections/sources/catalog/libraries/server/python/).
