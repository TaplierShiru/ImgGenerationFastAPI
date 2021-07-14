from .model import MODEL_PATH
import numpy as np


class WrapperTrainModel:

    """ Wrapper for serving NN model"""

    def __init__(self):
        self.model = self._init_model()
        self._buf_log = []
        self._show_last = 15
        self._build_train_stuf()

    def _init_model(self):
        pass

    def _build_train_stuf(self):
        pass

    def train_step(self, iterations: int, save_model: bool = True, prefix_iteration: int = 0, prefix_epoch: int = 0):
        for i in range(iterations):
            if i % 100:
                d_loss = float(np.random.randn(1))
                g_loss = float(np.random.randn(1))
                self._update_log(f'log in| epoch={prefix_epoch} iteration={i + prefix_iteration}, D={d_loss}, G={g_loss}')
        return self._buf_log

    def _update_log(self, data: str):
        self._buf_log.append(data)

        if len(self._buf_log) > self._show_last:
            self._buf_log = self._buf_log[len(self._buf_log) - self._show_last:]

