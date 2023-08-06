import axios from "axios";
import { store } from "./store";

const BASEURL = 'https://foreverdle-backend-680f16db361a.herokuapp.com'


export const publicRequest = axios.create({
    baseURL: BASEURL,
});

export const privateRequest = axios.create({
    baseURL: BASEURL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 60000
});

store.subscribe(() => {
    const state = store.getState();
    const authToken = state.auth.userToken;
    privateRequest.defaults.headers.Authorization = authToken ? `Bearer ${authToken}` : '';
});

const initialState = store.getState();
const initialAuthToken = initialState.auth.userToken;
privateRequest.defaults.headers.Authorization = initialAuthToken ? `Bearer ${initialAuthToken}` : '';
