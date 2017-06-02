import axios from 'axios';

export const GET_TRACKS = 'get_tracks';
export const GET_GENRES = 'get_genres';
export const GET_USERS = 'get_users';
export const AUTH_LOGIN = 'auth_login';
export const AUTH_USER = 'auth_user';
export const AUTH_LOGOUT = 'auth_logout';

const ROOT_URL = "http://localhost:3000/";

export function getTracks() {
    const request = axios.get(`${ROOT_URL}api/tracks`);
    
    return {
        type: GET_TRACKS,
        payload: request
    };
}

export function getGenres() {
    const request = axios.get(`${ROOT_URL}api/genres`);
    
    return {
        type: GET_GENRES,
        payload: request
    }
}

export function getUsers() {
    const request = axios.get(`${ROOT_URL}api/users`);
    
    return {
        type: GET_USERS,
        payload: request
    }
}

export function authLogin() {
    const request = axios.post(`${ROOT_URL}/authlocal`)
        .catch(err => console.log('ERROR LOGGING IN!', err));
    
    return {
        type: AUTH_LOGIN,
        payload: request
    }
}

export function authUser() {
    const request = axios.get(`${ROOT_URL}auth/me`);
    
    return {
        type: AUTH_USER,
        payload: request
    }
}

export function authLogout() {
    const request = axios.get(`${ROOT_URL}auth/logout`);
    
    return {
        type: AUTH_LOGOUT,
        payload: request
    }
}






