import React from "react";

const Button = ({ divClassName, buttonClassName, buttonName, onClick }) => {
  return (
    <div className={divClassName}>
      <button className={buttonClassName} onClick={onClick}>
        {buttonName}
      </button>
    </div>
  );
};

export default Button;
