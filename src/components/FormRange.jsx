import React from "react";
import { useState } from "react";
import { formatPrice } from "../utils";

const FormRange = ({ name, size, label, price, maxPrice, onChangeEvent }) => {
  const step = 1000;
  const [selectedPrice, setSelectedPrice] = useState(maxPrice);

  const handleChange = (e) => {
    const newValue = Number(e.target.value);
    setSelectedPrice(newValue);
    if (onChangeEvent) {
      onChangeEvent(e);
    }
  };
  return (
    <div className="form-control">
      <label htmlFor={name} className="label cursor-pointer">
        <span className="label-text capitalize">{label}</span>
        <span>{formatPrice(selectedPrice)}</span>
      </label>
      <input
        type="range"
        min={0}
        max={maxPrice}
        name={name}
        value={selectedPrice}
        onChange={handleChange}
        className={`range range-primary ${size}`}
        step={step}
      />
      <div className="w-full flex justify-between text-xs px-2 mt-2">
        <span className="font-bold text-md">0</span>
        <span className="font-bold text-md">Max : {formatPrice(maxPrice)}</span>
      </div>
    </div>
  );
};

export default FormRange;
