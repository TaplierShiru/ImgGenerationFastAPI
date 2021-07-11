from img_gen_fastapi.celery_task_app.tasks import predict_single
from img_gen_fastapi.templates import templates
from img_gen_fastapi.view.models import Task
from fastapi import APIRouter
from fastapi import Request, Form
from fastapi.responses import HTMLResponse

from celery.result import AsyncResult


router = APIRouter(
    prefix="/predict",
    tags=["predict"],
    responses={404: {"description": "Not found"}},
)

CURRENT_TASK_ID = None


@router.get("/", response_class=HTMLResponse)
async def predict_page(request: Request):
    global CURRENT_TASK_ID
    if CURRENT_TASK_ID is not None:
        # Take res (?)
        # Fetch result for given task_id
        task = AsyncResult(str(CURRENT_TASK_ID))
        if not task.ready():
            return templates.TemplateResponse(
                "predict.html",
                {"request": request, "res_is_ready": False, "process": True}
            )
        result = task.get()
        return templates.TemplateResponse(
            "predict.html",
            {"request": request, "res_is_ready": True, "result_path": "/".join(result.split('/')[1:]), "process": False}
        )
    return templates.TemplateResponse(
        "predict.html",
        {"request": request, "res_is_ready": False, "process": False}
    )


@router.post('/', response_model=Task, status_code=202)
async def churn(request: Request, predict: str = Form(None), save_res: str = Form(None), clear: str = Form(None)):
    """Create celery prediction task. Return task_id to client in order to retrieve result"""
    global CURRENT_TASK_ID
    if clear is not None:
        CURRENT_TASK_ID = None
        return {'task_id': str(CURRENT_TASK_ID),
                'status': f"Clear old image"}

    if save_res is not None:
        pass # TODO: Give possobility to download image

    # Otherwise - user click `predict`
    CURRENT_TASK_ID = predict_single.delay('test')
    return {'task_id': str(CURRENT_TASK_ID), 'status': f"Processing predict: {predict}, save_res: {save_res}, clear: {clear}"}


