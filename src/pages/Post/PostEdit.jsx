import React from "react";
import { useParams } from "react-router-dom";
import PostForm from "./PostForm";

function PostEdit() {
    const { postId } = useParams();
    return <PostForm mode="edit" postId={postId} />;
}

export default PostEdit;
