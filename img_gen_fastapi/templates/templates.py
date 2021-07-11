from fastapi.templating import Jinja2Templates

templates = None


def create_templates():
    return Jinja2Templates(directory="templates")


if templates is None:
    templates = create_templates()

