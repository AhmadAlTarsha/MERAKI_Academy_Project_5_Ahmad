import React from "react";

function Comment({
  commentDivClassName,
  commenterDivClassName,
  commenterImage,
  fullCommentDivClassName,
  createdAt,
  comment,
  commentClassName,
  commenterFullName,
  commenterFullNameClassName,
  createdAtClassName,
  comment_id
}) {
  return (
    <div key={comment_id} className={fullCommentDivClassName}>
      <div className={commenterDivClassName}>
        <img src={commenterImage} width={"50px"} height={"50px"}/>
        <h4 className={commenterFullNameClassName}>{commenterFullName}</h4>
        <h5 className={createdAtClassName}>{createdAt}</h5>
      </div>
      <div className={commentDivClassName}>
        <p className={commentClassName}>{comment}</p>
      </div>
    </div>
  );
}

export default Comment;
