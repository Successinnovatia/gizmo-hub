import React from "react";

const FormInput = ({ label, name, type, value, size, onChangeEvent }) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChangeEvent}
        className={`input input-bordered ${size}`}
      />
    </div>
  );
};

export default FormInput;
