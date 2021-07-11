from .model import MODEL_PATH
import numpy as np


class WrapperTrainModel:

    """ Wrapper for serving NN model"""

    def __init__(self):
        self.model = self._init_model()
        self._build_train_stuf()

    def _init_model(self):
        pass

    def _build_train_stuf(self):
        pass

    def train_step(self, iterations: int, save_model: bool = True):
        pass

