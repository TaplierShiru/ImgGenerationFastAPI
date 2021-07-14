import asyncio
from concurrent.futures import ProcessPoolExecutor
from functools import partial

import json

from img_gen_fastapi.celery_task_app.tasks import train_step_task
from img_gen_fastapi.templates import templates
from fastapi import APIRouter, Body, status
from fastapi import Request, Form
from fastapi.responses import HTMLResponse, RedirectResponse

from celery.result import AsyncResult


router = APIRouter(
    prefix="/train",
    tags=["train"],
    responses={404: {"description": "Not found"}},
)

TRAIN_CURRENT_TASK_ID = None
IS_ABORTED = False
NUM_ITERATION = None
NUM_EPOCH = None
PREV_TASK_INFO = None


@router.get("/", response_class=HTMLResponse)
async def train_page(request: Request, log_window: str = Body('Here will be some logs')):
    global TRAIN_CURRENT_TASK_ID, IS_ABORTED, PREV_TASK_INFO
    if TRAIN_CURRENT_TASK_ID is not None:
        # Take res (?)
        # Fetch result for given task_id
        task = AsyncResult(str(TRAIN_CURRENT_TASK_ID))
        if not task.ready():
            is_aborted = False
            if IS_ABORTED:
                is_aborted = True
                IS_ABORTED = False
            task_info = task.info
            if task_info is None:
                task_info = ""
            else:
                task_info = "\n".join(task_info['log'])
            PREV_TASK_INFO = task_info
            return templates.TemplateResponse(
                "train.html",
                {
                    "request": request, 'log_window': "Model is training...\n" + task_info,
                    'need_to_update': True, 'is_aborted': False,
                    'num_epoch_v': NUM_EPOCH, 'num_iteration_v': NUM_ITERATION}
            )
        TRAIN_CURRENT_TASK_ID = None
        PREV_TASK_INFO = None
        #with open('static/train/log.json', 'r') as fp:
        #    data = json.load(fp)['log']
        return templates.TemplateResponse(
            "train.html",
            {"request": request, 'log_window': "\n".join(task.get()), 'need_to_update': False, 'is_aborted': False}
        )
    if PREV_TASK_INFO is not None:
        prev_log = PREV_TASK_INFO
    else:
        prev_log = ""
    is_aborted = False
    if IS_ABORTED:
        is_aborted = True
        IS_ABORTED = False
    return templates.TemplateResponse(
        "train.html",
        {"request": request, 'log_window': log_window + '\n' + prev_log, 'need_to_update': False, 'is_aborted': is_aborted}
    )


@router.post('/', status_code=202)
async def post_train_page(
        request: Request,
        num_iteration: int = Form(...), num_epoch: int = Form(...),
        start: str = Form(None), stop: str = Form(None)):
    """Create celery prediction task. Return task_id to client in order to retrieve result"""
    global TRAIN_CURRENT_TASK_ID, IS_ABORTED, NUM_EPOCH, NUM_ITERATION
    if start is not None and TRAIN_CURRENT_TASK_ID is None:
        # Otherwise - user click `predict`
        NUM_ITERATION = num_iteration
        NUM_EPOCH = num_epoch
        TRAIN_CURRENT_TASK_ID = train_step_task.delay(num_iteration, num_epoch)

    if stop is not None and TRAIN_CURRENT_TASK_ID is not None:
        TRAIN_CURRENT_TASK_ID.abort()
        TRAIN_CURRENT_TASK_ID = None
        IS_ABORTED = True

    return RedirectResponse(router.url_path_for('train_page'), status_code=status.HTTP_302_FOUND)
