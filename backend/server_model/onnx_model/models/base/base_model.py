from abc import abstractmethod, ABC
import numpy as np


class BaseModel(ABC):

    @abstractmethod
    def predict(self, label: int, **kwargs) -> np.ndarray:
        pass


