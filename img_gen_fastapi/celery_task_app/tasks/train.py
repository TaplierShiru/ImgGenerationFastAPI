import json
import importlib
import logging
from celery.contrib.abortable import AbortableTask

from ..worker import app

LOG_PATH = 'static/train/log_{}.json'


class TrainTask(AbortableTask):
    """
    Abstraction of Celery's Task class to support training ML model.
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
          base=TrainTask,
          path=('celery_task_app.performed_tasks.train', 'WrapperTrainModel'),
          name='{}.{}'.format(__name__, 'WTModel'))
def train_step_task(self, iterations: int, epoch: int):
    """
    Essentially the run method of PredictTask
    """
    all_res = []
    for i_e in range(epoch):
        for i in range(iterations // 100):
            for _ in range(100_000_000):
                pass

            if self.is_aborted():
                # Task aborted
                return
            all_res += [self.model.train_step(iterations=100, prefix_iteration=100 * i, prefix_epoch=i_e)[0]]

            #with open(LOG_PATH.format(i), 'w') as fp:
            #    json.dump({"log" : data_log}, fp)
            self.update_state(state='PROGRESS', meta={"log": all_res, 'ith': i})
    # Task complete
    return all_res

