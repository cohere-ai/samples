from slack_bolt import App
from slack_bolt.adapter.socket_mode import SocketModeHandler
import os
from dotenv import load_dotenv
import sys

load_dotenv()
SLACK_BOT_TOKEN = sys.argv[1]
SLACK_APP_TOKEN = sys.argv[0]

app = App(token=SLACK_BOT_TOKEN)


@app.event("app_mention")
def mention_handler(body, say):
    say('Hello World!')


if __name__ == "__main__":
    handler = SocketModeHandler(app, SLACK_APP_TOKEN)
    handler.start()
