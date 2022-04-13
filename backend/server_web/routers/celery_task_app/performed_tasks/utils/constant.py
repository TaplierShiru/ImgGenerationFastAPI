import os

if os.environ.get('SERVER_MODEL_URL') is not None:
    SERVER_IP = os.environ.get('SERVER_MODEL_URL')
else:
    SERVER_IP = '127.0.0.1'
SERVER_PORT = 2117
