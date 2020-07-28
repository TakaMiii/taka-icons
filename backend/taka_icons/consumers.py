from channels.generic.websocket import WebsocketConsumer
import json

class ChatConsumer(WebsocketConsumer):
    def connect(self):
        print('連接')
        self.user = self.accept()

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        print('拿到')
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        self.send(text_data=json.dumps({
            'message': message
        }))
