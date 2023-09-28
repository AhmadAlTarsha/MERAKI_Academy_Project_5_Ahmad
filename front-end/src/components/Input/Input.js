import React from "react";

function Input({
  divClassName,
  labelName,
  labelClassName,
  type,
  name,
  placeHolder,
  onChange,
  inputClassName,
  value,
  labelDivClassname,
  inputDiv,

}) {
  return (
    <div className={divClassName}>
      <div className={labelDivClassname}>
        <label className={labelClassName} >{labelName}  </label>
      </div>
      <div className={inputDiv}>
        {" "}
        <input
          type={type}
          name={name}
          placeholder={placeHolder}
          onChange={onChange}
          className={inputClassName}
          value={value}
        />
      </div>
    </div>
  );
}

export default Input;
