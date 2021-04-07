import {get, post, put, remove} from "../utils/apiCaller"

class CommentService {
    getCommentByProductId(id){
        return get("/products/"+id+"/comments",{},{});
    }

    addComment(id, username, newComment){
        return post("/products/"+ id + "/users/"+ username+"/comments", {}, newComment, {});
    }
    updateComment(username, commentId, updateComment){
        return put("/users/"+ username+"/comments/"+commentId, {}, updateComment, {});
    }
    deleteComment(commentId){
        return remove("/comments/"+commentId,{},{});
    }
}

export default new CommentService();