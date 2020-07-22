import axios from 'axios'
const featch = axios.create({
    timeout: 10000,
    baseURL: '/api'
})
// Add a response interceptor
featch.interceptors.response.use(response => {
    const resdata = response.data
    if (resdata.errno === 0){
        return resdata.data;
    } else {
        Promise.reject(error)
    }
    
}, error => {
    return Promise.reject(error)
})

export default function (Vue) {
    Vue.$http=Vue.prototype.$http = featch
}