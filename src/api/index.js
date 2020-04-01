import { ajax } from './ajax'

export const getIndex = () => {
    return ajax('/index/data', {}, 'get');
}

export const UserRegister = (userName,password)=> {
    return ajax('/user/register', { userName, password }, 'post');
}

export const UserLogin = (userName,password)=> {
    return ajax('/user/login', { userName, password }, 'post');
}