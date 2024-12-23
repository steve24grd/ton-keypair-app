// src/Components/Button/Button.jsx
import React from "react";
import "./Button.css";

function Button({ type, title, disable, onClick }) {
  return (
    <button
      className={`btn ${
        (type === "add" && "add") ||
        (type === "remove" && "remove") ||
        (type === "action" && "action")
      }`}
      disabled={disable}
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export default Button;
