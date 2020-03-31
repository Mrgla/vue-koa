import { ajax } from './ajax'

export const getIndex = () => {
    return ajax('/bins/18coay', {}, 'get');
}