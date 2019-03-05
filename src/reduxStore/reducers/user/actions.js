import identificator from './identificator';
import dispatcher from 'reduxStore/dispatcher';
import apiRequest from 'lib/apiRequest';
import { helperRedirect } from 'helpers/redirect';

export async function me() {
    const prefix = 'me';
    try {
        const response = await new apiRequest('GET /me').redux(prefix, identificator).send();

        dispatcher(prefix, identificator, {data: response.getData()});
    } catch (e) {
        console.log(e);
    }
}

export function logout() {
    const prefix = 'logout';
    window.localStorage.removeItem('accessToken');
    dispatcher(prefix, identificator, 'reset');
    helperRedirect('/login');
}

export async function login(data) {
    const prefix = 'login';
    const response = await new apiRequest('POST /login', false).redux(prefix, identificator).sendJSON(data);
    const respData = response.getData();

    if (respData.accessToken && respData.user) {
        dispatcher(prefix, identificator, { data: respData.user });
        window.localStorage.setItem('accessToken', respData.accessToken);
    }
    // Something wrong here
    else {
        throw new Error(`Unexpected server authorization error`);
    }

    return true;
}

export async function signup(data) {
    const prefix = 'signup';
    const response = await new apiRequest('POST /signup', false).redux(prefix, identificator).sendJSON(data);
    const respData = response.getData();

    if (respData.accessToken && respData.user) {
        dispatcher(prefix, identificator, { data: respData.user });
        window.localStorage.setItem('accessToken', respData.accessToken);
    }
    // Something wrong here
    else {
        throw new Error(`Unexpected server registration error`);
    }


    return true;
}