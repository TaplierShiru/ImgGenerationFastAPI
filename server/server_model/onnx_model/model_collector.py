from .models import BaseModel, ModelSimpleCGANLN, ModelSimpleCGANNL
from typing import Dict, Optional


class ModelCollector:
    MODEL_NAME2CLASS: Dict[str, BaseModel] = {
        ModelSimpleCGANLN.__name__: ModelSimpleCGANLN,
        ModelSimpleCGANNL.__name__: ModelSimpleCGANNL,
    }

    @staticmethod
    def update_model_dict(name: str, class_instance):
        ModelCollector.MODEL_NAME2CLASS.update({
            str(name): class_instance
        })

    @staticmethod
    def init_model_by_name(config_data: dict, **kwargs) -> Optional[BaseModel]:
        taken_model = ModelCollector.MODEL_NAME2CLASS.get(config_data['type'])
        if taken_model is None:
            return
        created_model = taken_model(config_data, **kwargs)
        return created_model

