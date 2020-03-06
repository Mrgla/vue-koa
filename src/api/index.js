import { ajax } from './ajax'


export const getIndex = () => {
    return ajax('/bins/1egav2', {}, 'get');
}