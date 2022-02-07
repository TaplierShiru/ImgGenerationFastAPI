from fastapi import APIRouter, Request
from pydantic import BaseModel
from .logger import log
from .database import DataBaseController, ROLE_ADMIN


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
    result_info = ''
    if result:
        log.debug(f"Register username={userdata.username} with password={userdata.password}.")
        role = DataBaseController.get_user_role(username=userdata.username)
        log.debug(f"Register with role={userdata.username} and with token={userdata.password}.")
    else:
        log.debug(f"Do not register username={userdata.username} with password={userdata.password}.")
        # User already exist
        result_info = f"User with username={userdata.username} already exist. Please enter a different username."

    return { "result": result, 'resultInfo': result_info }


class UserNameRoleData(BaseModel):
    username: str
    role: str


@router.post('/delete')
async def delete_user(userdata: UserNameRoleData, request: Request):
    log.debug(f"Delete user with username={userdata.username} with role={userdata.role}")
    # Client side can't delete user with role `admin`
    if userdata.role == ROLE_ADMIN:
        log.debug(f"Delete user with username={userdata.username} with role={userdata.role} - denied.")
        result = False
        result_info = "You can't delete user with role admin."
        return { 'status': result, 'resultInfo': result_info }

    result = DataBaseController.remove_user(username=userdata.username)
    result_info = ''
    # Error while connect to db or user does not exist
    if not result:
        result_info = "User deletion error. Can't connect to DataBase or user doesn't exist."
        log.debug(f"Delete user with username={userdata.username} with role={userdata.role} - denied.")
    else:
        log.debug(f"Delete user with username={userdata.username} with role={userdata.role} - success.")
    return { 'status': result, 'resultInfo': result_info }


@router.get("/get_all")
async def get_all_users(request: Request):
    log.debug(f"Get all users.")
    all_users = DataBaseController.get_all_users_data()
    return { "result": True, 'arrayUsers': all_users }

