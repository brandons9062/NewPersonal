import axios from 'axios';

export const GET_TRACKS = 'get_tracks';
export const GET_GENRES = 'get_genres';
export const GET_USERS = 'get_users';

const ROOT_URL = "localhost:3000/api";

export function getTracks() {
    const request = axios.get(`${ROOT_URL}/tracks`);
    
    return {
        type: GET_TRACKS,
        payload: request
    };
}

export function getGenres() {
    const request = axios.get(`${ROOT_URL}/genres`);
    
    return {
        type: GET_GENRES,
        payload: request
    }
}

export function getUsers() {
    const request = axios.get(`${ROOT_URL}/users`);
    
    return {
        type: GET_USERS,
        payload: request
    }
}