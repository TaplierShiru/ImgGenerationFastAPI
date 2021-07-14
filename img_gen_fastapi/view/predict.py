from img_gen_fastapi.celery_task_app.tasks import predict_single
from img_gen_fastapi.templates import templates
from fastapi import APIRouter, Request, Form, status
from fastapi.responses import HTMLResponse, RedirectResponse

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


@router.post('/', status_code=202)
async def post_predict_page(
        request: Request,
        predict: str = Form(None), save_res: str = Form(None),
        clear: str = Form(None), label_gen: int = Form(0)):
    """Create celery prediction task. Return task_id to client in order to retrieve result"""
    global CURRENT_TASK_ID
    if clear is not None:
        CURRENT_TASK_ID = None
        return RedirectResponse(router.url_path_for('predict_page'), status_code=status.HTTP_302_FOUND)

    if save_res is not None:
        return RedirectResponse(router.url_path_for('predict_page'), status_code=status.HTTP_302_FOUND)

    # Otherwise - user click `predict`
    CURRENT_TASK_ID = predict_single.delay('test', label_gen)
    return RedirectResponse(router.url_path_for('predict_page'), status_code=status.HTTP_302_FOUND)


