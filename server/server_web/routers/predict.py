from .celery_task_app import predict_single
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

CURRENT_TASK_ID = None


@router.get("/take_result")
async def get_predict_result(request: Request):
    global CURRENT_TASK_ID
    if CURRENT_TASK_ID is not None:
        log.debug("get prediction result")
        # Fetch result for given task_id
        task = AsyncResult(str(CURRENT_TASK_ID))
        if not task.ready():
            log.debug("result is not ready...")
            return { "imageUrl": False }
        log.debug("result is ready...")
        CURRENT_TASK_ID = None
        result = task.get()
        # Load img
        img_bytes = image2base64(f"static/prediction/{result}")
        return { "imageUrl": img_bytes }

    return { "imageUrl": None }


class GenerateLabel(BaseModel):
    label: int


@router.post('/')
async def post_predict(generate_label: GenerateLabel):
    """
    Create celery prediction task.
    Return task_id to client in order to retrieve result
    """
    global CURRENT_TASK_ID
    if CURRENT_TASK_ID is None:
        # TODO: Call celery task here
        CURRENT_TASK_ID = predict_single.delay(generate_label.label)
    return { "status_task": True }

