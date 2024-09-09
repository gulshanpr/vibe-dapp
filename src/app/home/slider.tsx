import React, { useState, useEffect, useRef } from 'react';

const CustomSlider = ({ min = -10, max = 10, step = 1 }) => {
  const [value, setValue] = useState(0);
  const [debouncedValue, setDebouncedValue] = useState(value);
  const timeoutRef = useRef<null | NodeJS.Timeout>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setValue(newValue);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(newValue);
    }, 1000);
  };

  useEffect(() => {
    // console.log('Slider value changed:', value);
  }, [value]);

  useEffect(() => {
    console.log('Debounced slider value:', debouncedValue);
  }, [debouncedValue]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      <div className="text-2xl font-bold mb-4">{value}</div>
      <div className="relative w-full">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div
          className="absolute top-1/2 left-1/2 w-0.5 h-4 bg-black -translate-x-1/2 -translate-y-1/2"
          style={{ pointerEvents: 'none' }}
        ></div>
      </div>
      <div className="flex justify-between w-full mt-2">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};

export default CustomSlider;