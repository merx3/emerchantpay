import React from 'react';
import { useParams } from "react-router-dom";

function ViewPost() {
    const { postId } = useParams();

    return(
        <div>
            Viewing post {postId}
        </div>
    )
}
export default ViewPost;