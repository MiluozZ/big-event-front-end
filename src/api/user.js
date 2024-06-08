import request from "../utils/request";

export const registerService = (registerData) => {
    return request.post('/user/register', registerData);
}