import React from "react";

const FormCheckbox = ({ label, name, size, defaultValue, onChangeEvent }) => {
  return (
    <div className="form-control items-center">
      <label htmlFor={name} className="label cursor-pointer">
        {label}
      </label>
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultValue}
        onChange={onChangeEvent}
        className={`checkbox checkbox-primary ${size}`}
      />
    </div>
  );
};

export default FormCheckbox;
