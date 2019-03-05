import axios from 'axios';
import * as userActions from 'reduxStore/reducers/user/actions';
import dispatcher from 'reduxStore/dispatcher';


const API_BASE_URL = 'http://localhost:3010';

class apiRequest {
    __unifyErrorsHandler = true;
    __method = 'GET';
    __url = '/';
    __options = {
        headers: {},
    };
    __data = null;
    __redux = null;

    constructor(url = 'GET /', unifyErrorsHandler = true) {
        this.__unifyErrorsHandler = unifyErrorsHandler;
        const spaceIndex = url.indexOf(' ');
        this.__method = url.substr(0, spaceIndex).trim().toUpperCase();
        this.__url = url.substr(spaceIndex + 1).trim();
    }

    redux(prefix, identificator) {
        this.__redux = {
            prefix,
            identificator,
        };

        return this;
    }

    qs(params = {}) {
        const esc = encodeURIComponent;
        const query = Object.keys(params)
            .map(k => esc(k) + '=' + esc(params[k]))
            .join('&');

        this.__url += (this.__url.indexOf('?') === -1 ? '?' : '&') + query;

        return this;
    }

    options (options = {}) {
        this.__options = {
            ...this.options,
            ...options
        };

        return this;
    }

    async __send() {
        let options = {
            ...this.__options,
            method: this.__method
        };
        if (this.__data !== null) options.data = this.__data;

        const userAccessToken = getUserAccessToken();
        if (userAccessToken) options.headers['Authorization'] = userAccessToken;

        let baseUrl = window.API_BASE_URL || API_BASE_URL;
        options.url = baseUrl + this.__url;

        let response;

        try {
            if (this.__redux) {
                dispatcher(this.__redux.prefix + '__fetching', this.__redux.identificator, { isFetching: true });
            }
            response = await axios(options);
        } catch (e) {
            response = e.response;
        } finally {
            if (this.__redux) {
                dispatcher(this.__redux.prefix + '__fetching_end', this.__redux.identificator, { isFetching: false });
            }
        }

        if (response.status === 401) {
            userActions.logout();
        }

        if (response.status >= 200 && response.status < 300) {
            let resp = response.data;
            if (this.__redux) {
                dispatcher(this.__redux.prefix + '__original_response_data', this.__redux.identificator, { originalResponseData: resp });
            }

            //if (resp.data) resp = resp.data;

            resp.getData = () => {
                return resp.data || resp.Data;
            };

            return resp;
        }
        else {
            const resp = response.data;
            const msg = resp.message || response.statusText;

            let error = new Error(msg);
            error.response = response;

            if (this.__redux) {
                dispatcher(this.__redux.prefix + '__error', this.__redux.identificator, { error: error });
            }

            if (!this.__unifyErrorsHandler) throw error;

            console.error(error);
            // Any default error catching behavior

            throw error;
        }
    }

    async sendJSON(data = {}) {
        this.__data = JSON.stringify(data);

        this.__options.headers = {
            'Content-Type': 'application/json'
        };

        return this.__send();
    }

    async send(data = null) {
        this.__data = data;

        return this.__send();
    }
}

function getUserAccessToken() {
    return window.localStorage.getItem('accessToken');
}



export default apiRequest;
