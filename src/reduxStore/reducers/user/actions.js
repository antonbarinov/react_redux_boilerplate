import identificator from './identificator';
import dispatcher from 'reduxStore/dispatcher';
import apiRequest from 'lib/apiRequest';
import { helperRedirect } from 'helpers/redirect';

export async function me() {
    const data = await new apiRequest('GET /me').send();
    dispatcher('me', identificator, data);
}

export function logout() {
    window.localStorage.removeItem('accessToken');
    dispatcher('logout', identificator, false);
    helperRedirect('/login');
}

export async function login(data) {
    const res = await new apiRequest('POST /login', false).sendJSON(data);
    if (res.accessToken && res.user) {
        dispatcher('login', identificator, res.user);
        window.localStorage.setItem('accessToken', res.accessToken);
    }
    // Something wrong here
    else {
        throw new Error(`Unexpected server authorization error`);
    }

    return true;
}

export async function signup(data) {
    const res = await new apiRequest('POST /signup', false).sendJSON(data);
    if (res.accessToken && res.user) {
        dispatcher('signup', identificator, res.user);
        window.localStorage.setItem('accessToken', res.accessToken);
    }
    // Something wrong here
    else {
        throw new Error(`Unexpected server registration error`);
    }


    return true;
}