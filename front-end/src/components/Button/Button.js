import React from "react";

const Button = ({
  divClassName,
  buttonClassName,
  buttonName,
  onClick,
  is_disabled,
}) => {
  return (
    <div className={divClassName}>
      <button className={buttonClassName} onClick={onClick} disabled={is_disabled}>
        {buttonName}
      </button>
    </div>
  );
};

export default Button;
