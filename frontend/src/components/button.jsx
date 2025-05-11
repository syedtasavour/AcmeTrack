import React from "react";

const Button = ({ label, onClick, type = "button", className = "" }) => {
  return (
    <button type={type} onClick={onClick} className={`button ${className}`}>
      <span className="text">{label}</span>
    </button>
  );
};

export default Button;
