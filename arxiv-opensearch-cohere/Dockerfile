FROM python:3.10-slim

ARG COHERE_API_KEY 

# install git to fetch packages directly from github
RUN apt-get update && \ 
    apt-get install -y git && \
    apt-get install gcc -y && \
    apt-get install -y build-essential \
    && pip install --upgrade pip \ 
    && apt-get install curl -y

COPY requirements.txt app/requirements.txt

RUN pip install -r app/requirements.txt

WORKDIR /app

COPY . /app

EXPOSE 8080

CMD ["/bin/bash", "run_app.sh"] 