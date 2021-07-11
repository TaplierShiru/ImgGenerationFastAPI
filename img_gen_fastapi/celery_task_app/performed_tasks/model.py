import numpy as np
import os


MODEL_PATH = 'Super_path/model' #os.environ['MODEL_PATH']


class WrapperModel:

    """ Wrapper for loading and serving pre-trained model"""

    def __init__(self):
        self.model = self._load_model_from_path(MODEL_PATH)

    @staticmethod
    def _load_model_from_path(path):
        return None

    def predict(self, data):
        """
        Make batch prediction on list of preprocessed feature dicts.
        Returns class probabilities if 'return_options' is 'Prob', otherwise returns class membership predictions
        """
        #return self.model.predict(df)
        return np.random.randn(400, 400, 3).astype(np.uint8)

