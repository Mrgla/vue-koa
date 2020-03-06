import axios from 'axios'

let baseURL = process.env.NODE_ENV == 'development' ? '/api' : ''

export function ajax(url, data = {}, type = 'get') {
    let _this = this

    url = baseURL + url
    return new Promise((resolve, reject) => {
        // console.log('url', url)
        let promise = type == 'get' ?
            axios.get(url, { params: data }) :
            axios.post(url, data)

        promise.then(res => {
            if (res.status === 200) {
                resolve(res.data)
            } else {
                reject(res)
                // _this.$toast('网络错误~');`
            }
        }).catch(err => {
            reject(err)
            // _this.$toast('网络错误~');
        })
    })

}
