import { myAxios } from "./helper";

export const register = (userData) => {
    return myAxios.post('/api/auth/register', userData)
        .then((response) => response.data);
}

export const login = (loginDetails) => {
    return myAxios.post('/api/auth/login', loginDetails)
        .then((response) => response.data);
}