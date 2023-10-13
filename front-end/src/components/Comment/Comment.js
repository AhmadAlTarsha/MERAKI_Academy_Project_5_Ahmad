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
}) {
  return (
    <div className={fullCommentDivClassName}>
      <div className={commenterDivClassName}>
        <image src={commenterImage} />
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
