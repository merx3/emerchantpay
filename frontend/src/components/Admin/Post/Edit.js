import React from 'react';
import { useParams } from "react-router-dom";

function Edit() {
    const { postId } = useParams();

    return(
        <div>
            Editing post {postId}
        </div>
    )
}
export default Edit;