import {get, post, put, remove } from "../utils/apiCaller"

class CommentService {
    getCommentByProductId(credential) {
        return get(`/products/${credential.productId}/comments?username=${credential.username}`, {}, {});
    }

    addComment(proId, username, newComment) {
        return post(`/products/${proId}/users/${username}/comments`, {}, newComment, {});
    }
    addCommentParent(proId, username, newComment, parentId) {
        return post(`/products/${proId}/users/${username}/comments?parentId=${parentId}`, {}, newComment, {});
    }
    updateComment(username, commentId, updateComment) {
        return put("/users/" + username + "/comments/" + commentId, {}, updateComment, {});
    }
    deleteComment(commentId, username) {
        return remove(`/comments/${commentId}?username=${username}`, {}, {});
    }
}

export default new CommentService();