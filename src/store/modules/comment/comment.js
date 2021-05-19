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
        try {
            const response = await CommentService.getCommentByProductId(credential);
            if (response.status === 200) {
                await commit(SET_COMMENTS, response.data.content)
                return await response.status;
            } else {
                return await response.status;
            }
        } catch (error) {
            return await error.response.status;
        }
    },
    async createComment({ commit }, creadential) {
        if (creadential.newComment.parentId) {
            try {
                const response = await CommentService.addCommentParent(creadential.productId, creadential.userName, creadential.newComment, creadential.newComment.parentId);
                if (response.status === 200) {
                    await commit(ADD_COMMENT, response.data);
                    return await response.status;
                } else {
                    return await response.status;
                }
            } catch (error) {
                return await error.response.status;
            }
        } else {
            try {
                const response = await CommentService.addComment(creadential.productId, creadential.userName, creadential.newComment);
                if (response.status === 200) {
                    await commit(ADD_COMMENT, response.data);
                    return await response.status;
                } else {
                    return await response.status;
                }
            } catch (error) {
                return await error.response.status;
            }
        }

    },
    async deleteComment({ commit }, creadential) {
        try {
            const response = await CommentService.deleteComment(creadential.commentId, creadential.userName);
            if (response.status === 200) {
                await commit(REMOVE_COMMENT, creadential.commentId);
                return await response.status;
            } else {
                return await response.status;
            }
        } catch (error) {
            return await error.response.status;
        }
    }
};

export default {
    namespaced: true, // giup nhan biet dispatch, phan biet den store nao
    state,
    getters,
    mutations,
    actions
}