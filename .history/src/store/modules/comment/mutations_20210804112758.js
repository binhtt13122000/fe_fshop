import { SET_PAGE, SET_PAGES, SET_COMMENTS, SET_COMMENT, REMOVE_COMMENT, DELETE_COMMENT_BY_ADMIN, ADD_COMMENT, GET_COMMENT_BY_PRODUCTID } from './mutation-type'
export default {
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