import axios from 'axios';
import config from '../_helpers/config';


export function removeUser(username, role){
  axios.post(`${config.serverUrl}/users/delete`, { username: username, role: role }).then(
    (response) => {
      if (response.result){
        console.log("User deleted.");
      }
  }).catch(
    (error) => console.log(error)
  );
}


export async function getAllUsersFromServer(){
    let arrayUsers = [];

    await axios.get(`${config.serverUrl}/users/get_all`).then(
      (response) => {
        if (response.data.result){
          arrayUsers = response.data.arrayUsers;
        }
    }).catch(
      (error) => console.log(error)
    );

    return arrayUsers;
}