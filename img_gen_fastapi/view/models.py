from pydantic import BaseModel


class Task(BaseModel):
    """ Celery task representation """
    task_id: str
    status: str


class Prediction(BaseModel):
    """ Prediction task result """
    task_id: str
    status: str
    path_result: str

