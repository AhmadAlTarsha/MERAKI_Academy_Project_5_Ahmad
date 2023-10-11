import React from "react";

function TextArea({

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
        <> <label className={labelClassName} >{labelName}  </label>
            <textarea
                type={type}
                name={name}
                placeholder={placeHolder}
                onChange={onChange}
                className={inputClassName}
                value={value}
            />
        </>

    );
}

export default TextArea;
