import pandas as pd
import streamlit as st
from utils import (colorize, colorize_st, find_similar_docs,
                   format_search_output, search_fuzzy, search_match_phrase)


def visualize(top_row, color):
    print(
        f"""Top result for lexical search is arxiv_id={top_row['arxiv_id']} with score={top_row['score']}\n"""
    )
    colored_text = colorize(top_row.abstract, query_keywords, color=color)
    print(colored_text)
    return colored_text


def visualize_st(top_row, color):
    st.write(
        f"""Top result is **arxiv_id={top_row['arxiv_id']}** with **score={top_row['score']}**\n"""
    )
    colored_text = colorize_st(top_row.abstract, query_keywords, color=color)
    st.write(colored_text)


st.title("OpenSearch/Cohere demo")
st.markdown("## Input search query")
st.markdown(
    """
    * `arxiv-l2` index uses L2 distance as the distance metric for OpenSearch's kNN
    * `arxiv-cosine` index uses cosine distance as the distance metric for OpenSearch's kNN
    """
)
INDEX_NAME = st.selectbox(
    "**which index do you want to use?**", ("arxiv-l2", "arxiv-cosine")
)
query = st.text_input("**query**", "what is a non coding dna substring")

query_keywords = [q for q in query.split(" ") if len(q) > 2]

lexical_df = pd.DataFrame()
for q in query_keywords:
    out_shard = search_match_phrase(field="text", query=q, index_name=INDEX_NAME)
    df_ = format_search_output(out_shard)
    lexical_df = pd.concat([lexical_df, df_], axis=0)

fuzzy_df = pd.DataFrame()
for q in query_keywords:
    out_shard = search_fuzzy(field="text", query=q, fuzziness=1, index_name=INDEX_NAME)
    df_ = format_search_output(out_shard)
    fuzzy_df = pd.concat([fuzzy_df, df_], axis=0)

semantic_out = find_similar_docs(query=query, k=2, num_results=3, index_name=INDEX_NAME)
semantic_df = format_search_output(semantic_out)

st.markdown("## Visualize search results")
st.markdown(
    """    
    Let's take the top abstract result from the `lexical_df`, `fuzzy_df` and the top abstract result from the `semantic_df` and see if the results look interesting. 
    They query keywords in all abstract results are highlighted to show that while the semantic results may not retrieve the most keywords, the results are semantically more meaningful than lexical/fuzzy based approaches.
    """
)
st.markdown("### Lexical search")
try:
    visualize_st(lexical_df.iloc[0], color="red")
except:
    st.error(f"lexical search returned nothing")

st.markdown("### Fuzzy search")
try:
    visualize_st(fuzzy_df.iloc[0], color="blue")
except:
    st.error(f"fuzzy search returned nothing")

st.markdown("### Semantic search")
try:
    visualize_st(semantic_df.iloc[0], color="green")
except:
    st.error(f"semantic search returned nothing")
