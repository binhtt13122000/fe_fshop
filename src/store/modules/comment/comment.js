import CommentService from "../../../services/CommentService.js";
import { SET_PAGE, SET_PAGES, REMOVE_COMMENT, DELETE_COMMENT_BY_ADMIN, ADD_COMMENT, GET_COMMENT_BY_PRODUCTID } from './mutation-type'

const state = {
    comments: [],
    comment: [],
    pages: [],
    page: [],
};

const getters = {

    pagesComment(state) {
        return state.pages
    },
    page(state) {
        return state.page
    },
    comment(state) {
        return state.comment
    },
    comments(state) {
        return state.comments
    }
};


const mutations = {
    [SET_PAGES]: (state, val) => {
        state.pages = val
    },

    [SET_PAGE]: (state, val) => {
        state.page = val
    },
    [ADD_COMMENT]: (state, comment) => {
        state.products.push(comment)
    },

    [REMOVE_COMMENT]: (state, id) => {
        const products = [...state.products];
        const deletedProducts = products.filter(product => {
            return product.productId !== id;
        })
        state.products = deletedProducts;
    },

    [DELETE_COMMENT_BY_ADMIN]: (state, id) => {
        const comments = [...state.comments];
        const deletedComments = comments.filter(comment => {
            return comment.commentId !== id;
        })
        state.comments = deletedComments;
    },
    [GET_COMMENT_BY_PRODUCTID]: (state, id) => {
        state.comments = id
    }


    // [UPDATE_PRODUCT]: (state, newProduct) => {
    //     const products = [...state.products];
    //     const index = products.findIndex(product => {
    //         return product.productId === newProduct.productId; 
    //     })
    //     state.products[index] = newProduct;

    // }


};

const actions = {
    // async updateProductOfList({commit}, newProduct){
    //     const response = await CommentService.updateProduct(newProduct);
    //     if(response.status === 200){
    //         commit(UPDATE_PRODUCT, newProduct);
    //     }
    //     throw new Error(response.status)
    // },
    async createComment({ commit }, productId, username, newComment) {
        const response = await CommentService.addComment(productId, username, newComment);
        if (response.status === 200) {
            commit(ADD_COMMENT, newComment);
        }
        throw new Error(response.status)
    },
    // async updateComment({commit}, productId, username, newComment){
    //     const response =  await CommentService.addComment(productId, username, newComment);
    //     if(response.status === 200){
    //         commit(UPDATE_COMMENT, newComment);
    //     }
    //     throw new Error(response.status)
    // },
    async getCommentById({ commit }, id) {
        const response = await CommentService.getCommentByProductId(id);
        console.log("oke1")
        console.log(response.data);
        if (response.status === 200) {
            commit(GET_COMMENT_BY_PRODUCTID, response.data.content)
            console.log("oke")
        }
        throw new Error(response.status)
    }
};

export default {
    namespaced: true, // giup nhan biet dispatch, phan biet den store nao
    state,
    getters,
    mutations,
    actions
}