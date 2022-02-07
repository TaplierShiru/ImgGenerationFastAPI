from typing import Optional
import os
from PIL.Image import Image
from .config_inspector import ConfigInspector
from .model_collector import ModelCollector

PATH_TO_SAVE_FOLDER = '/server_web_static/prediction'


class ModelInteractor:

    def __init__(self):
        self._prev_model_name = None
        self._prev_config = None
        self._model = None

    def _load_model(self, name: str):
        if self._prev_model_name is not None and name == self._prev_model_name and self._model is not None:
            return self._model
        # Clear old one
        self._model = None
        self._prev_model_name = None
        # Load new
        model_config_dict = ConfigInspector.get_model_config(name)
        if model_config_dict is None:
            return
        # Load model
        self._model = ModelCollector.init_model_by_name(model_config_dict)
        self._prev_model_name = name

    def make_prediction(self, label: int, model_name: str, prefix_to_save: str = 'img') -> Optional[str]:
        self._load_model(model_name)
        if self._model is None:
            return

        final_img: Image = self._model.predict(label)
        # Save img and return file name
        file_name = f"{prefix_to_save}_generation_res.png"
        save_path = os.path.join(PATH_TO_SAVE_FOLDER, file_name)
        final_img.save(save_path)
        return file_name

