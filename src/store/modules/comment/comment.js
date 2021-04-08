import CommentService from "../../../services/CommentService.js";
import { SET_PAGE, SET_PAGES, SET_COMMENTS, SET_COMMENT, REMOVE_COMMENT, DELETE_COMMENT_BY_ADMIN, ADD_COMMENT, GET_COMMENT_BY_PRODUCTID } from './mutation-type'

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
    [SET_COMMENTS]: (state, val) => {
        state.comment = val
    },
    [SET_COMMENT]: (state, val) => {
        state.comments = val
    },
    [SET_PAGES]: (state, val) => {
        state.pages = val
    },

    [SET_PAGE]: (state, val) => {
        state.page = val
    },
    [ADD_COMMENT]: (state, comment) => {
        state.comments.push(comment)
    },

    [REMOVE_COMMENT]: (state, id) => {
        const comments = [...state.comments];
        const index = comments.findIndex(comment => comment.commentId === id);
        comments[index].status = -1;
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
    async getCommentById({ commit }, productId) {
        const response = await CommentService.getCommentByProductId(productId);
        if (response.status === 200) {
            return commit(SET_COMMENTS, response.data.content)
        }
        throw new Error(response.status)
    },
    async createComment({ commit }, creadential) {
        const response = await CommentService.addComment(creadential.productId, creadential.userName, creadential.newComment);
            console.log(creadential.newComment);
        if (response.status === 200) {
            return commit(ADD_COMMENT, creadential.newComment);
        }
        throw new Error(response.status)
    },
    async deleteComment({ commit }, creadential){
        const response = await CommentService.deleteComment(creadential.commentId, creadential.userName);
        if(response.status === 200){
            return commit(REMOVE_COMMENT, creadential);
        }
        throw new Error(response.status)
    }
    // async updateComment({commit}, productId, username, newComment){
    //     const response =  await CommentService.addComment(productId, username, newComment);
    //     if(response.status === 200){
    //         commit(UPDATE_COMMENT, newComment);
    //     }
    //     throw new Error(response.status)
    // },

};

export default {
    namespaced: true, // giup nhan biet dispatch, phan biet den store nao
    state,
    getters,
    mutations,
    actions
}