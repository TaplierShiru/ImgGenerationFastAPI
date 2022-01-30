import hashlib
import secrets
from typing import Dict, List
import copy

USERS = {
    'admin': { 'role': 'admin', 'password': 'admin', 'token': 'admin-token'},
    'user': { 'role': 'user', 'password': 'user', 'token': 'user-token' },
}


class DataBaseController:

    @staticmethod
    def add_user(username: str, password: str) -> bool:
        global USERS
        if not DataBaseController.is_exist(username, password):
            USERS.update({
                str(username): {
                    'role': 'user',
                    'token': secrets.token_bytes(8).decode('unicode_escape'),
                    'password': password
                },
            })
            return True
        return False

    @staticmethod
    def remove_user(username: str, role: str):
        for user_k, user_v in USERS.items():
            if user_k == username and user_v['role'] == role:
                del USERS[user_k]
                return True

        return False

    @staticmethod
    def is_exist(username: str, password: str) -> bool:
        for user_k, user_v in USERS.items():
            if username == user_k and user_v['password'] == password:
                return True
        return False

    @staticmethod
    def get_user_role(username: str):
        for user_k in USERS:
            if user_k == username:
                return USERS[user_k]['role']
        return None

    @staticmethod
    def get_user_token(username: str):
        for user_k in USERS:
            if user_k == username:
                return USERS[user_k]['token']
        return None

    @staticmethod
    def get_all_users_data() -> List[Dict[str, str]]:
        """
        Return dict with data:
            [
                {
                    username: value,
                    role: value,
                    ...
                },
                ...
                {
                    username: value,
                    role: value,
                    ...
                },
            ]

        """
        new_users_list = []
        for user_k, user_v in USERS.items():
            copy_dict = copy.deepcopy(user_v)
            copy_dict['username'] = user_k
            # Remove unnessecary data
            del copy_dict['password']
            del copy_dict['token']
            new_users_list.append(copy_dict)
        return new_users_list

