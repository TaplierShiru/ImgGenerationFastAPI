from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app = None


def create_app():
    app = FastAPI()
    from img_gen_fastapi.view import predict
    app.include_router(predict.router)
    from img_gen_fastapi.view import train
    app.include_router(train.router)
    from img_gen_fastapi.view import enter
    app.include_router(enter.router)

    app.mount("/static", StaticFiles(directory="static"), name="static")
    return app


if app is None:
    app = create_app()
