import os
import traceback
import xmlrpc.client
from typing import Optional


# Connect to server with model
class ModelClient:
    if os.environ.get('SERVER_MODEL_URL') is not None:
        SERVER_IP = os.environ.get('SERVER_MODEL_URL')
    else:
        SERVER_IP = '127.0.0.1'
    SERVER_PORT = 2117

    def __init__(self):
        self._server_rcp = xmlrpc.client.ServerProxy(
            f'http://{ModelClient.SERVER_IP}:{ModelClient.SERVER_PORT}'
        )

    def get_prediction(self, label: int) -> Optional[str]:
        try:
            return self._server_rcp.get_prediction(label)
        except Exception as ex:
            traceback.print_exc()
            return
