import React from "react";

function Comment({
  commentDivClassName,
  commenterDivClassName,
  commenterImage,
  fullCommentDivClassName,
  createdAt,
  comment,
  commenterFullName,
}) {
  return (
    <div className={fullCommentDivClassName}>
      <div className={commenterDivClassName}>
        <image src={commenterImage} />
        <h4>{commenterFullName}</h4>
      </div>
      <div className={commentDivClassName}>
        <h5>{createdAt}</h5>
        <p>{comment}</p>
      </div>
    </div>
  );
}

export default Comment;
