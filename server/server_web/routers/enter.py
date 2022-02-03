from fastapi import APIRouter, Request
from pydantic import BaseModel
from .logger import log
from .database import DataBaseController


router = APIRouter(
    prefix="/users",
    tags=["users"],
    responses={404: {"description": "Not found"}},
)


class UserData(BaseModel):
    username: str
    password: str


@router.post("/enter")
async def enter_func(userdata: UserData, request: Request):
    log.debug(f"Enter username={userdata.username} with password={userdata.password}.")
    result = DataBaseController.is_exist(username=userdata.username)
    role = DataBaseController.get_user_role(username=userdata.username)
    return { "result": result, 'role': role }


@router.post("/register")
async def register_func(userdata: UserData, request: Request):
    result = DataBaseController.add_user(username=userdata.username, password=userdata.password)
    if result:
        log.debug(f"Register username={userdata.username} with password={userdata.password}.")
        role = DataBaseController.get_user_role(username=userdata.username)
        log.debug(f"Register with role={userdata.username} and with token={userdata.password}.")
    else:
        log.debug(f"Do not register username={userdata.username} with password={userdata.password}.")
        # User already exist
        role = None

    return { "result": result, 'role': role }


class UserNameRoleData(BaseModel):
    username: str
    role: str


@router.post('/delete')
async def delete_user(userdata: UserNameRoleData, request: Request):
    log.debug(f"Delete user with username={userdata.username} with role={userdata.role}")
    result = DataBaseController.remove_user(username=userdata.username)
    return { 'result': result }


@router.get("/get_all")
async def get_all_users(request: Request):
    log.debug(f"Get all users.")
    all_users = DataBaseController.get_all_users_data()
    return { "result": True, 'arrayUsers': all_users }

