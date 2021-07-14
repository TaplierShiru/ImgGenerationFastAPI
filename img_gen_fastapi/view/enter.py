from img_gen_fastapi.templates import templates
from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse


router = APIRouter(
    prefix="",
    tags=[""],
    responses={404: {"description": "Not found"}},
)


@router.get("/", response_class=HTMLResponse)
async def enter_page(request: Request):
    return templates.TemplateResponse(
        "enter.html",
        {"request": request}
    )

