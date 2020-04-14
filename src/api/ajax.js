import axios from 'axios'
import { Toast } from "vant";


let baseURL = process.env.NODE_ENV == 'development' ? '/api' : ''

export function ajax(url, data = {}, type = 'get') {
    let _this = this
    url = baseURL + url
    Toast.loading({
        forbidClick: true,
        loadingType: 'spinner'
    });

    return new Promise((resolve, reject) => {
        // console.log('url', url)
        let promise = type == 'get' ?
            axios.get(url, { params: data }) :
            axios.post(url, data)

        promise.then(res => {
            Toast.clear();
            if (res.status === 200) {
                resolve(res.data)
            } else {
                reject(res)
                Toast('网络错误~');
            }
        }).catch(err => {
            Toast.clear();
            reject(err)
            Toast('网络错误~');
        })
    })

}
