from slack_bolt import App
from slack_bolt.adapter.socket_mode import SocketModeHandler
import os
from dotenv import load_dotenv

load_dotenv()
SLACK_BOT_TOKEN = '46873ec258b13596fc2257133dd9fc0a'
SLACK_APP_TOKEN = 'xapp-1-A03DTFAJH9P-3456932096339-9f15e0764ba8488089c545687e264a93cb41c8174cd5c552be468832765c5607'

app = App(token=SLACK_BOT_TOKEN)


@app.event("app_mention")
def mention_handler(body, say):
    say('Hello World!')


if __name__ == "__main__":
    handler = SocketModeHandler(app, SLACK_APP_TOKEN)
    handler.start()
