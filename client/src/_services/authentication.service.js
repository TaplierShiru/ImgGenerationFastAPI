import { BehaviorSubject } from 'rxjs';
import axios from 'axios';
import config from '../_helpers/config';


const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login, register, logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() { return currentUserSubject.value },
    get currentUserNameValue() { return currentUserSubject.value.username }
};

async function login(username, password){
    // We must send auth data to server and get some response, for now do this simply
    let user = null;

    await axios.post(`${config.serverUrl}/users/enter`, {
        username: username, password: password,
    }).then((response) => {
        if (response.data.result){
            // User can log in
            user = {
                username: username, role: response.data.role
            };
            // Save data and update subject
            console.log(`Enter user with: ${JSON.stringify(user)}`);
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);
        }
    }).catch(
        (error) => { console.log(error); }
    );
    return user;
}

async function register(username, password, passwordSecond){

    let result = {
        status: false,
        errorMessage: '',
    }

    // Check, each field must be with some string
    if (!username || !password || !passwordSecond){
        result.errorMessage = 'One of the fields does not filled.';
        return result;
    }
    // Check, password and second password must be the same
    if (password !== passwordSecond){
        result.errorMessage = 'Passwords does not equal.';
        return result;
    }
    // We must send auth data to server and get some response
    await axios.post(`${config.serverUrl}/users/register`, {
        username: username, password: password,
    }).then((response) => {
        if (response.data.result){
            // User register success
            console.log(`Register user with: ${JSON.stringify(response.data)}`);
            result.status = true;
        } else {
            result.errorMessage = response.data.resultInfo;
            result.status = false;
        }
    }).catch(
        (error) => { 
            console.log(error);
            result.errorMessage = "Can't connect to server."; 
        }
    );
    return result;
}

function logout() {
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}
