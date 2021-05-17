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
    [SET_COMMENT]: (state, val) => {
        state.comment = val
    },
    [SET_COMMENTS]: (state, val) => {
        state.comments = val
    },
    [SET_PAGES]: (state, val) => {
        state.pages = val
    },

    [SET_PAGE]: (state, val) => {
        state.page = val
    },
    [ADD_COMMENT]: (state, cmt) => {
        state.comments.push(cmt);
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

};

const actions = {
    async getCommentById({ commit }, credential) {
        const response = await CommentService.getCommentByProductId(credential);
        console.log(response)
        if (response.status === 200) {
            return commit(SET_COMMENTS, response.data.content)
        }
        throw new Error(response.status)
    },
    async createComment({ commit }, creadential) {
        if (creadential.newComment.parentId) {
            const response = await CommentService.addCommentParent(creadential.productId, creadential.userName, creadential.newComment, creadential.newComment.parentId);
            console.log(response.data);
            if (response.status === 200) {
                return await commit(ADD_COMMENT, response.data);
            }
            throw new Error(response.status)
        } else {
            const response = await CommentService.addComment(creadential.productId, creadential.userName, creadential.newComment);
            console.log(456);
            if (response.status === 200) {
                return await commit(ADD_COMMENT, response.data);
            }
            throw new Error(response.status)
        }

    },
    async deleteComment({ commit }, creadential) {
        const response = await CommentService.deleteComment(creadential.commentId, creadential.userName);
        console.log(response)
        if (response.status === 200) {
            await commit(REMOVE_COMMENT, creadential.commentId);
            return response.status;
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