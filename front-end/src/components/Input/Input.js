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
}) {
  return (
    <div className={divClassName}>
      <label className={labelClassName}>{labelName}</label>
      <input
        type={type}
        name={name}
        placeholder={placeHolder}
        onChange={onChange}
        className={inputClassName}
        value={value}
      />
    </div>
  );
}

export default Input;
