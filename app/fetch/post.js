import 'whatwg-fetch'
import 'es6-promise'

// 将对象拼接成 key1=val1&key2=val2&key3=val3 的字符串形式
const obj2params = (obj)=> {
    let result = ''
    for (let item in obj) {
        result += '&' + item + '=' + encodeURIComponent(obj[item])
    }

    if (result) {
        result = result.slice(1)
    }

    return result
}

// 发送 post 请求
export function post(url, paramsObj) {
    let result = fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: obj2params(paramsObj)
    })

    return result
}
