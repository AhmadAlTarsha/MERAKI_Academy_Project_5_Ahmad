import React from "react";

function Card({
  divClassName,
  imageSrc,
  altName,
  width,
  height,
  cardName,
  cardNameClass,
  onClick,
}) {
  return (
    <div className={divClassName} onClick={onClick}>
      <img src={imageSrc} alt={altName} width={width} height={height} />
      <h3 className={cardNameClass}>{cardName}</h3>
    </div>
  );
}

export default Card;
