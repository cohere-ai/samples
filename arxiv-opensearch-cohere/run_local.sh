source opensearchvenv/bin/activate
streamlit run demoapp.py --browser.gatherUsageStats=False --server.port=8080 --server.address=$(tailscale ip) --logger.level=info 2> streamlit_logs.log