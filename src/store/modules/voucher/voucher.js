import VoucherService from "../../../services/VoucherService";
import { SET_VOUCHERS, ADD_VOUCHER, SET_PAGES } from './mutation-type'

const state = {
    vouchers: [],
    pages: "",
};

const getters = {
    vouchers(state) {
        return state.vouchers
    },
};


const mutations = {
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

const actions = {
    async createVoucher({ commit }, credential) {
        try {
            const response = await VoucherService.createVoucher(credential.username, credential);
            if (response.status === 200) {
                await commit(ADD_VOUCHER, response.data.content);
                return await response.status;
            } else {
                return await response.status;
            }
        } catch (error) {
            return await error.response.status;
        }
    },
    async getVouchers({ commit }, username) {
        try {
            const response = await VoucherService.getVouchers(username);
            if (response.status === 200) {
                await commit(SET_VOUCHERS, response.data);
                return await response.status;
            } else {
                return await response.status;
            }
        } catch (error) {
            await commit(SET_VOUCHERS, []);
            return await error.response.status;
        }
    },
    async getVoucherById({ commit }, credential) {
        try {
            const response = await VoucherService.getVoucherById(credential.username, credential.voucherId)
            if (response.status === 200) {
                await commit(SET_PAGES, "");
                return await response.status;
            } else {
                return await response.status;
            }
        } catch (err) {
            return await err.response.status;
        }
    },
};

export default {
    namespaced: true, // giup nhan biet dispatch, phan biet den store nao
    state,
    getters,
    mutations,
    actions
}