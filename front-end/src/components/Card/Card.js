import React from "react";

function Card({
  divClassName,
  imageSrc,
  altName,
  width,
  height,
  cardName,
  cardNameClass,
}) {
  return (
    <div className={divClassName}>
      <img src={imageSrc} alt={altName} width={width} height={height} />
      <h3 className={cardNameClass}>{cardName}</h3>
    </div>
  );
}

export default Card;
