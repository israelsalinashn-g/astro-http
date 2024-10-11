import { getPostLikes } from "./post/get-post-likes.action";
import { updatePostLikes } from "./post/updatepost-likes.action";

export const server = {
    getPostLikes,
    updatePostLikes,
};