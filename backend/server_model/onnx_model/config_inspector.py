import json
from typing import List, Optional

from .utils import PATH_TO_CONFIG_FILE


class ConfigInspector:

    @staticmethod
    def get_all_model_names() -> List[str]:
        model_data_dict = ConfigInspector.read_model_data()
        return list(model_data_dict.keys())

    @staticmethod
    def read_model_data() -> dict:
        with open(PATH_TO_CONFIG_FILE, 'r') as fp:
            return json.load(fp)

    @staticmethod
    def get_model_config(name: str) -> Optional[dict]:
        models_config = ConfigInspector.read_model_data()
        return models_config.get(name)

    @staticmethod
    def get_label_array(model_name: str) -> List[int]:
        model_data_dict = ConfigInspector.read_model_data()
        return model_data_dict[model_name]['labels']
