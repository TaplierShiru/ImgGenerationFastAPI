import traceback

from .celery_task_app import predict_single
from .celery_task_app.performed_tasks import ModelClient
from .utils import image2base64
from .logger import log
from fastapi import APIRouter, Request

from celery.result import AsyncResult
from pydantic import BaseModel

router = APIRouter(
    prefix="/predict",
    tags=["predict"],
    responses={404: {"description": "Not found"}},
)

USERNAME2CURRENT_TASK_ID_DICT = dict()


class UserData(BaseModel):
    username: str


@router.post("/take_result")
async def get_predict_result(userdata: UserData):
    global USERNAME2CURRENT_TASK_ID_DICT
    task_id = str(USERNAME2CURRENT_TASK_ID_DICT.get(str(userdata.username)))
    if task_id is not None:
        try:
            log.debug("get prediction result")
            # Fetch result for given task_id
            task = AsyncResult(task_id)
            if not task.ready():
                log.debug("result is not ready...")
                return { "imageUrl": False }
            log.debug("result is ready...")
            result = task.get()
            # Load img as bytes in base64
            img_bytes = image2base64(f"static/prediction/{result}")
            return { "imageUrl": img_bytes }
        except Exception as e:
            log.debug(e)
        finally:
            del USERNAME2CURRENT_TASK_ID_DICT[str(userdata.username)]

    return { "imageUrl": None }


class GenerateLabel(BaseModel):
    label: int
    model_name: str
    username: str


@router.post('/')
async def post_predict(generate_label: GenerateLabel):
    """
    Create celery prediction task.
    Return task_id to client in order to retrieve result
    """
    global USERNAME2CURRENT_TASK_ID_DICT
    log.debug(
        f"Predict with label={generate_label.label} model_name={generate_label.label} " +\
        f"username={generate_label.username} - accepted"
    )
    if USERNAME2CURRENT_TASK_ID_DICT.get(generate_label.username) is None:
        log.debug(
            f"Predict with label={generate_label.label} model_name={generate_label.label} " +\
            f"username={generate_label.username} - start task"
        )
        USERNAME2CURRENT_TASK_ID_DICT[str(generate_label.username)] = predict_single.delay(
            generate_label.label, generate_label.model_name, generate_label.username
        )
    return { "status_task": True }


@router.get('/get_all_model_names')
async def get_all_model_names(request: Request):
    """
    Return list of model names

    """
    model_names_list = ModelClient.static_get_all_model_names()
    return { "result": True, "modelNamesArray": model_names_list }


class ModelData(BaseModel):
    model_name: str


@router.post("/get_label_array")
async def get_label_array(model_data: ModelData):
    """
    Return array of labels for chosen model

    """
    model_label_array = ModelClient.static_get_model_label_array(model_data.model_name)
    return { "result": True, "modelLabelArray": model_label_array }