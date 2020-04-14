import { ajax } from './ajax'

// 首页 
export const getIndex = () => {
    return ajax('/index/data', {}, 'get');
}

// 商品详情
export const getDetailGoodsInfo = (goodsId) => {
    return ajax('/goods/getDetailGoodsInfo', { goodsId }, 'get');
}
// 获取大类
export const getCategoryList = () => {
    return ajax('/goods/getCategoryList', {}, 'get');
}
// 获取子类
export const getCategorySubList = (categoryId) => {
    return ajax('/goods/getCategorySubList', { categoryId }, 'get');
}
//  获取商品
export const getGoodsBySubId = (categorySubId, page, pageSize) => {
    return ajax('/goods/getGoodsListByCategorySubID', { categorySubId, page, pageSize }, 'get');
}

// 注册
export const UserRegister = (userName, password) => {
    return ajax('/user/register', { userName, password }, 'post');
}
// 登录
export const UserLogin = (userName, password) => {
    return ajax('/user/login', { userName, password }, 'post');
}

