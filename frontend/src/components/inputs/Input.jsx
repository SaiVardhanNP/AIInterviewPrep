import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label className="text-[16px] text-slate-800">{label}</label>
      <div className="input-box flex items-center gap-2">
        <input
          type={type === 'password' && showPassword ? 'text' : type}
          placeholder={placeholder}
          value={value}
          className="w-full bg-transparent outline-none"
          onChange={(e) => onChange(e)}
        />
        {type === 'password' && (
          showPassword ? (
            <FaRegEye
              size={22}
              className="text-primary cursor-pointer"
              onClick={togglePasswordVisibility}
            />
          ) : (
            <FaRegEyeSlash
              size={22}
              className="text-slate-400 cursor-pointer"
              onClick={togglePasswordVisibility}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Input;
