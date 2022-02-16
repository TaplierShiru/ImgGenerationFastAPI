import axios from 'axios';
import config from '../_helpers/config';


export async function removeUser(username, role){
  let result = {
    status: false,
    errorMessage: '',
  }

  await axios.post(`${config.serverUrl}/users/delete`, { username: username, role: role }).then(
    (response) => {
      if (response.data.status){
        result.status = true;
      } else {
        result.errorMessage = response.data.resultInfo;
      }
  }).catch(
    (error) => { 
      console.log(error);
      result.errorMessage = "Error, Can't connect to server.";
    }
  );

  return result;
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