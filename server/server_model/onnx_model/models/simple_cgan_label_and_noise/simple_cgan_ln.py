from ..base import BaseModel
import numpy as np
from PIL import Image
import onnxruntime


class ModelSimpleCGANLN(BaseModel):

    def __init__(self, config_data: dict):
        # Load session
        self._ort_session = onnxruntime.InferenceSession(
            config_data['path'], providers=['CPUExecutionProvider']
        )
        self._config_data = config_data

    def predict(self, label: int, **kwargs) -> Image:
        ort_inputs = {
            self._ort_session.get_inputs()[0].name: np.array([[label]], dtype=np.int32),
            self._ort_session.get_inputs()[1].name: np.random.normal(
                size=(1, self._config_data['noise_dim'])
            ).astype(np.float32)
        }
        ort_outs = self._ort_session.run(None, ort_inputs)
        final_img = np.squeeze(ort_outs[0]) # First out, first batch
        final_img = ((final_img + 1) * 128).astype(np.uint8).clip(0, 255)
        final_img = Image.fromarray(final_img, mode='L') # black/white colors
        final_img = final_img.convert("RGB")
        final_img = final_img.resize((224, 224))
        return final_img

