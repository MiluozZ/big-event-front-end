import request from "../utils/request";

export const registerService = (registerData) => {
    const params = new URLSearchParams();
    for (const key in registerData) {
        params.set(key, registerData[key]);
    }
    return request.post('/user/register', params);
}

export const loginService = (loginData) => {
    const params = new URLSearchParams();
    for (const key in loginData) {
        params.set(key, loginData[key]);
    }
    return request.post('/user/login', params);
}