import traceback
import xmlrpc.client
from typing import Optional

from .utils import SERVER_PORT, SERVER_IP


# Connect to server with model
class ModelClient:

    @staticmethod
    def set_connection():
        return xmlrpc.client.ServerProxy(
            f'http://{SERVER_IP}:{SERVER_PORT}'
        )

    def __init__(self):
        self._server_rcp = ModelClient.set_connection()

    def get_prediction(self, label: int, model_name: str) -> Optional[str]:
        try:
            return self._server_rcp.get_prediction(label, model_name)
        except Exception as ex:
            traceback.print_exc()
            return

    @staticmethod
    def static_get_all_model_names():
        try:
            server_rcp = ModelClient.set_connection()
            return server_rcp.get_all_model_names()
        except Exception as ex:
            traceback.print_exc()
            return

    @staticmethod
    def static_get_model_label_array(model_name: str):
        try:
            server_rcp = ModelClient.set_connection()
            return server_rcp.get_label_array(model_name)
        except Exception as ex:
            traceback.print_exc()
            return

