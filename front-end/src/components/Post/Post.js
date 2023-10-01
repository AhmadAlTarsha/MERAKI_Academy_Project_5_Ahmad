import React from "react";

function Post({
  imageSrc,
  altName,
  width,
  height,
  bodyDivClassName,
  postDivClassName,
  userName,
  bodyClassName,
  body,
  userDivClassName,
  images,
}) {
  return (
    <div className={postDivClassName}>
      <div className={userDivClassName}>
        <img src={imageSrc} alt={altName} width={width} height={height} />
        <h3>{userName}</h3>
      </div>
      <div className={bodyDivClassName}>
        <p className={bodyClassName}>{body}</p>
        <img src={images} />
      </div>
    </div>
  );
}

export default Post;
