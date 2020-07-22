import http from '../http.base'
class GoodsServices {
    getGoodsList(params = {}) {
        http.get('/seller').then(response => {
            return response
        })
    }
}
export default new GoodsServices()