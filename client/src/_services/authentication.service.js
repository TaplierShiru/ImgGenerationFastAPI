import { BehaviorSubject } from 'rxjs';
import axios from 'axios';
import config from '../_helpers/config';


const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
var error_message = null;

export const authenticationService = {
    login, register, logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() { return currentUserSubject.value },
    get errorMessage() { return error_message }
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
                username: username, role: response.data.role, token: response.data.token,
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
    if (username == null || password == null || passwordSecond == null){
        error_message = 'One of the field does not filled';
        return null;
    }

    if (password !== passwordSecond){
        error_message = 'Passwords does not equal';
        return null;
    }
    // We must send auth data to server and get some response, for now do this simply
    let isAllGood = false;

    await axios.post(`${config.serverUrl}/users/register`, {
        username: username, password: password,
    }).then((response) => {
        if (response.data.result){
            // User register success
            console.log(`Register user with: ${JSON.stringify(response.data)}`);
            isAllGood = true;
        }
    }).catch(
        (error) => { console.log(error); }
    );
    return isAllGood;
}

function logout() {
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}
