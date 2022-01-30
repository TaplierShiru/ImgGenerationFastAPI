import onnxruntime
from PIL import Image
import numpy as np
import os

PATH_TO_SAVE_FOLDER = '/server_web_static/prediction'


class Model:

    def __init__(self):
        self._ort_session = onnxruntime.InferenceSession(
            "onnx_model/model.onnx", providers=['CPUExecutionProvider']
        )

    def predict(self, label: int) -> str:
        ort_inputs = {
            self._ort_session.get_inputs()[0].name: np.array([[label]], dtype=np.int32),
            self._ort_session.get_inputs()[1].name: np.random.normal(size=(1, 100)).astype(np.float32)
        }
        ort_outs = self._ort_session.run(None, ort_inputs)
        final_img = np.squeeze(ort_outs[0]) # First out, first batch
        final_img = ((final_img + 1) * 128).astype(np.uint8).clip(0, 255)

        final_img = Image.fromarray(final_img, mode='L') # black/white colors
        final_img = final_img.convert("RGB")
        final_img = final_img.resize((224, 224))
        # get the output image follow post-processing step from PyTorch implementation
        # Save the image, we will compare this with the output image from mobile device
        file_name = "generation_res.png"
        save_path = os.path.join(PATH_TO_SAVE_FOLDER, file_name)
        final_img.save(save_path)

        return file_name

