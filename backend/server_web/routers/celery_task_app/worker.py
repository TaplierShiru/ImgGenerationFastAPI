import os
from celery import Celery

if os.environ.get('BROKER_URI') is None:
    BROKER_URI = 'pyamqp://'
else:
    BROKER_URI = os.environ['BROKER_URI']

if os.environ.get('BACKEND_URI') is None:
    BACKEND_URI = 'redis://localhost'
else:
    BACKEND_URI = os.environ['BACKEND_URI']


app = Celery(
    'celery_app',
    broker=BROKER_URI,
    backend=BACKEND_URI,
    include=['routers.celery_task_app.tasks.predict'] # List of tasks
)