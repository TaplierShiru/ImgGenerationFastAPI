import os
from celery import Celery

BROKER_URI =  'pyamqp://'             # os.environ['BROKER_URI']
BACKEND_URI = 'redis://localhost'             # os.environ['BACKEND_URI']

app = Celery(
    'celery_app',
    broker=BROKER_URI,
    backend=BACKEND_URI,
    include=['img_gen_fastapi.celery_task_app.tasks.predict', 'img_gen_fastapi.celery_task_app.tasks.train']
)