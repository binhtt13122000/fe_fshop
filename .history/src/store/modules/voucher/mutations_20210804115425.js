import { SET_VOUCHERS, ADD_VOUCHER, SET_PAGES } from './mutation-type'
export default {
    [SET_VOUCHERS]: (state, val) => {
        state.vouchers = val
    },
    [ADD_VOUCHER]: (state, voucher) => {
        state.vouchers.push(voucher)
    },
    [SET_PAGES]: (state, val) => {
        state.pages = val;
    }
};