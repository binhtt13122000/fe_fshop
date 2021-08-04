export default {
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