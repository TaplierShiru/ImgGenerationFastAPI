from skimage import io

import importlib
import logging
from celery import Task

from ..worker import app


class PredictTask(Task):
    """
    Abstraction of Celery's Task class to support loading ML model.
    """
    abstract = True

    def __init__(self):
        super().__init__()
        self.model = None

    def __call__(self, *args, **kwargs):
        """
        Load model on first call (i.e. first task processed)
        Avoids the need to load model on each task request
        """
        if not self.model:
            logging.info('Loading Model...')
            module_import = importlib.import_module(self.path[0])
            model_obj = getattr(module_import, self.path[1])
            logging.info('Type: {}'.format(model_obj))
            self.model = model_obj()
            logging.info('Model loaded')
        return self.run(*args, **kwargs)


@app.task(ignore_result=False,
          bind=True,
          base=PredictTask,
          path=('celery_task_app.performed_tasks.model', 'WrapperModel'),
          name='{}.{}'.format(__name__, 'WModel'))
def predict_single(self, path_data: str, label_gen: int, path_save: str = 'static/prediction/test.png'):
    """
    Essentially the run method of PredictTask
    """
    pred_array = self.model.predict([path_data], label_gen=label_gen)
    io.imsave(path_save, pred_array)
    return path_save

