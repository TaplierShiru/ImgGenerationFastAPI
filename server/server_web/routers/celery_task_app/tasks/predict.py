import importlib
import logging
from celery import Task
from celery.utils.log import get_task_logger
from ..worker import app

logger = get_task_logger(__name__)


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
          path=('routers.celery_task_app.performed_tasks.model_client', 'ModelClient'),
          name='{}.{}'.format(__name__, 'MClient'))
def predict_single(self, label_gen: int = 0):
    """
    Essentially the run method of PredictTask
    """
    logger.info(f"Start prediction with label_gen={label_gen}")
    path_saved = self.model.get_prediction(label_gen)
    logger.info("Return prediction...")
    return path_saved

