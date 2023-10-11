import React from "react";

function Card({
  divClassName,
  imageSrc,
  altName,
  cardName,
  cardNameClass,
  onClick,
}) {
  return (
    <div
      className={"w-1/4 flex flex-col justify-center items-center"}
      onClick={onClick}
    >
      <div className={"w-1/2 rounded-full mb-3"}>
        <img
          src={imageSrc}
          alt={altName}
          width={"100%"}
          height={"100%"}
          className={"rounded-full object-cover"}
        />
      </div>
      <h3 className={"text-white text-lg"}>{cardName}</h3>
    </div>
  );
}

export default Card;
