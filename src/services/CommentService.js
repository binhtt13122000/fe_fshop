import {get, post, put, remove} from "../utils/apiCaller"

class CommentService {
    getCommentByProductId(id){
        return get(`/products/${id}/comments`,{},{});
    }

    addComment(proId, username, newComment){
        return post(`/products/${proId}/users/${username}/comments`, {}, newComment, {});
    }
    updateComment(username, commentId, updateComment){
        return put("/users/"+ username+"/comments/"+commentId, {}, updateComment, {});
    }
    deleteComment(commentId, username){
        return remove(`/comments/${commentId}?username=${username}`,{},{});
    }
}

export default new CommentService();