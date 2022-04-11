import { ADD_COUNTER, ADD_TO_CART, CHANGE_CHECKED, CHANGE_SECLECT_ALL } from './mutation-types'
export default {
    [ADD_COUNTER](state, payload) {
        payload.count++
    },
    [ADD_TO_CART](state, payload) {
        payload.isChecked = true
        state.cartList.push(payload)
    },
    [CHANGE_CHECKED](state, payload) {
        state.cartList[payload].isChecked = !state.cartList[payload].isChecked
    },
    [CHANGE_SECLECT_ALL](state, payload) {
        if (payload) {
            state.cartList.forEach(item => item.isChecked = false)
        } else {
            state.cartList.forEach(item => item.isChecked = true)
        }
    }

}