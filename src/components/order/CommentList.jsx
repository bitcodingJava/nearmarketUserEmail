import React from 'react'

//userComment prop을 받아옴
const CommentList = ({ userComment }) => {
    return (
        <>
            <div className="userCommentBox">
                <p className='userName'>{userComment.userName}</p>
                <div className="userComment">{userComment.text}</div>
            </div>

        </>
    )
}

export default CommentList